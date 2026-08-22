const mongoose = require("mongoose");

/**
 * Generates the all-numeric employee Login ID described in the spec:
 *
 *   [2-digit company code][name code][year of joining][4-digit serial]
 *
 *   Example (spec): 05 2080 2023 0001
 *     05   -> company / head code
 *     2080 -> derived from the employee's first + last name
 *     2023 -> year of joining
 *     0001 -> serial number of joining, that year
 *
 * The name code is the alphabet position (A=01 … Z=26) of the first letter
 * of the first name followed by that of the last name — e.g. "Test User"
 * -> T(20) U(21) -> 2021. The company code prefers any digits already in
 * the company's `code`, otherwise it derives a stable 2-digit value from
 * the code's letters.
 *
 * The Login ID can now be used to sign in (see auth.controller's login),
 * alongside email.
 */

const letterIndex = (ch) => {
  const code = String(ch || "").toUpperCase().charCodeAt(0) - 64; // A=1 … Z=26
  return code >= 1 && code <= 26 ? code : 0;
};

const two = (n) => String(n).padStart(2, "0").slice(-2);

const namePart = (fullName) => {
  const parts = String(fullName || "").trim().split(/\s+/).filter(Boolean);
  const first = parts[0] || "";
  const last = parts.length > 1 ? parts[parts.length - 1] : first;
  return `${two(letterIndex(first[0]))}${two(letterIndex(last[0]))}`;
};

const companyPart = (company) => {
  const raw = company?.code || company?.name || "";
  const digits = String(raw).replace(/\D/g, "");
  if (digits.length >= 2) return digits.slice(0, 2);

  const letters = String(raw).replace(/[^A-Za-z]/g, "").toUpperCase();
  const combined = (letterIndex(letters[0]) * 26 + letterIndex(letters[1] || "A")) % 100;
  return two(combined);
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
  const joinDate = dateOfJoining ? new Date(dateOfJoining) : new Date();
  const year = joinDate.getUTCFullYear();

  const companyId =
    company?._id || (mongoose.isValidObjectId(company) ? company : null);

  const serial = await nextSerialForYear(User, companyId, year);

  return `${companyPart(company)}${namePart(name)}${year}${String(serial).padStart(4, "0")}`;
};

module.exports = { generateLoginId };
