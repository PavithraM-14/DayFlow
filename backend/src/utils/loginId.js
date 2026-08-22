const mongoose = require("mongoose");

/**
 * Generates the employee Login ID described in the spec:
 *
 *   [Company Code][first two letters of first name][first two letters of
 *   last name][year of joining][4-digit serial number for that year]
 *
 *   Example: OIJODO20220001
 *     OI    -> Odoo India (company code)
 *     JODO  -> first two letters of first + last name
 *     2022  -> year of joining
 *     0001  -> serial number of joining, that year
 *
 * This is a display/reference identifier (shown on the profile page, not
 * used to sign in — sign-in is still email + password, see auth.controller).
 */

const namePart = (fullName) => {
  const parts = String(fullName || "").trim().split(/\s+/).filter(Boolean);
  const first = parts[0] || "";
  const last = parts.length > 1 ? parts[parts.length - 1] : first;

  const two = (s) => (s + "XX").slice(0, 2).toUpperCase();
  return `${two(first)}${two(last)}`;
};

/**
 * Counts existing users at this company hired in `year` to pick the next
 * serial. Not perfectly race-proof under concurrent creates, but good
 * enough for this scale — a collision would just mean two employees
 * share a display ID, which does not affect sign-in.
 */
const nextSerialForYear = async (User, companyId, year) => {
  const start = new Date(Date.UTC(year, 0, 1));
  const end = new Date(Date.UTC(year + 1, 0, 1));

  const count = await User.countDocuments({
    company: companyId,
    dateOfJoining: { $gte: start, $lt: end },
  });

  return count + 1;
};

const generateLoginId = async ({ User, company, name, dateOfJoining }) => {
  const companyCode = company?.code || "CO";
  const joinDate = dateOfJoining ? new Date(dateOfJoining) : new Date();
  const year = joinDate.getUTCFullYear();

  const companyId =
    company?._id || (mongoose.isValidObjectId(company) ? company : null);

  const serial = await nextSerialForYear(User, companyId, year);

  return `${companyCode}${namePart(name)}${year}${String(serial).padStart(4, "0")}`;
};

module.exports = { generateLoginId };
