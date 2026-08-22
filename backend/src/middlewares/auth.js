const { verifyAuthToken } = require("../utils/token");

/**
 * Gates a route on a valid `Authorization: Bearer <token>` header and
 * hangs the decoded payload on `req.auth` ({ sub, role, company }).
 *
 * Only the token is checked here — no database round-trip — so handlers
 * that need current user details should still load them (see the `me`
 * controller).
 */
const requireAuth = (req, res, next) => {
  const header = req.headers.authorization || "";
  const [scheme, token] = header.split(" ");

  if (!token || scheme.toLowerCase() !== "bearer") {
    return res
      .status(401)
      .json({ success: false, message: "You need to sign in to do that" });
  }

  const payload = verifyAuthToken(token);

  if (!payload) {
    return res.status(401).json({
      success: false,
      message: "Your session has expired. Please sign in again.",
    });
  }

  req.auth = payload;
  return next();
};

/**
 * Restricts a route to the given roles. Always used after requireAuth,
 * which is what puts the role on the request.
 */
const requireRole =
  (...roles) =>
  (req, res, next) => {
    if (!req.auth || !roles.includes(req.auth.role)) {
      return res.status(403).json({
        success: false,
        message: "You do not have access to that",
      });
    }
    return next();
  };

module.exports = { requireAuth, requireRole };
