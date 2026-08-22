const mongoose = require("mongoose");

const EmployeeRequest = require("../models/employeeRequest.model");
const User = require("../models/user.model");

const fail = (res, status, message, extra = {}) =>
  res.status(status).json({ success: false, message, ...extra });

/**
 * Every handler here is scoped to req.auth.company — the company on the
 * signed-in HR's token. That scoping is the authorization: without it an
 * HR at one company could read, approve, or reject another company's
 * applicants by guessing an id.
 */

/**
 * GET /api/employee-requests?status=pending
 *
 * The queue behind the "New Employee Verification" page. `status` accepts
 * a single status or "all"; anything unrecognised falls back to pending,
 * which is what the page opens on.
 */
const listRequests = async (req, res, next) => {
  try {
    const requested = (req.query.status || "pending").toLowerCase();
    const status = EmployeeRequest.STATUSES.includes(requested)
      ? requested
      : null;

    const filter = { company: req.auth.company };
    if (status) filter.status = status;
    else if (requested !== "all") filter.status = "pending";

    const requests = await EmployeeRequest.find(filter)
      .populate("reviewedBy", "name email")
      .sort({ createdAt: -1 })
      .limit(200)
      .lean();

    // Lets the page show a badge count without a second request.
    const pendingCount = await EmployeeRequest.countDocuments({
      company: req.auth.company,
      status: "pending",
    });

    return res.status(200).json({
      success: true,
      message: "",
      data: {
        requests: requests.map(({ passwordHash, ...rest }) => rest),
        pendingCount,
      },
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Loads a request that the signed-in HR is actually allowed to act on,
 * and confirms it is still open. Returns null after responding, so
 * callers can `if (!request) return;`.
 */
const loadOpenRequest = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    fail(res, 400, "Invalid request id");
    return null;
  }

  const request = await EmployeeRequest.findOne({
    _id: id,
    company: req.auth.company,
  }).select("+passwordHash");

  if (!request) {
    fail(res, 404, "That request no longer exists");
    return null;
  }

  if (request.status !== "pending") {
    // Named requestStatus, not status: a top-level `status` in the body
    // reads as the HTTP status and gets confused with it by clients that
    // merge the two.
    fail(res, 409, `This request has already been ${request.status}.`, {
      requestStatus: request.status,
    });
    return null;
  }

  return request;
};

/**
 * PATCH /api/employee-requests/:id/approve
 *
 * Where the account is finally created. The password hash was carried on
 * the request since sign-up, so the new user signs in with the password
 * they originally chose — they are never asked to set it again.
 */
const approveRequest = async (req, res, next) => {
  try {
    const request = await loadOpenRequest(req, res);
    if (!request) return undefined;

    // Someone may have been created under this email since the request
    // was raised (a separate HR sign-up, say).
    if (await User.findOne({ email: request.email })) {
      request.status = "rejected";
      request.reviewedBy = req.auth.sub;
      request.reviewedAt = new Date();
      await request.save();

      return fail(
        res,
        409,
        "An account with that email already exists, so this request was closed."
      );
    }

    let user;
    try {
      user = await User.create({
        name: request.name,
        email: request.email,
        phone: request.phone,
        role: request.role,
        passwordHash: request.passwordHash,
        company: request.company,
        // The applicant proved control of the address by OTP before the
        // request was ever created.
        emailVerifiedAt: request.emailVerifiedAt || new Date(),
      });
    } catch (error) {
      if (error.code === 11000) {
        return fail(res, 409, "An account with that email already exists");
      }
      throw error;
    }

    request.status = "approved";
    request.reviewedBy = req.auth.sub;
    request.reviewedAt = new Date();
    request.approvedUser = user._id;
    await request.save();

    return res.status(200).json({
      success: true,
      message: `${user.name} can now sign in`,
      data: { request: request.toJSON(), user: user.toJSON() },
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * PATCH /api/employee-requests/:id/reject
 *
 * Keeps the record rather than deleting it, so the applicant can be told
 * they were rejected when they try to sign in.
 */
const rejectRequest = async (req, res, next) => {
  try {
    const request = await loadOpenRequest(req, res);
    if (!request) return undefined;

    request.status = "rejected";
    request.reviewedBy = req.auth.sub;
    request.reviewedAt = new Date();
    await request.save();

    return res.status(200).json({
      success: true,
      message: `${request.name}'s request was rejected`,
      data: { request: request.toJSON() },
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { listRequests, approveRequest, rejectRequest };
