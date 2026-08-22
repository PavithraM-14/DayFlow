/**
 * Salary structure math, straight from the spec's worked example:
 *
 *   Wage = ₹50,000
 *     Basic                = 50%    of Wage        = ₹25,000
 *     House Rent Allowance = 50%    of Basic        = ₹12,500
 *     Standard Allowance   = flat (default ₹4,167)
 *     Performance Bonus    = 8.33%  of Basic        = ₹2,082.50
 *     Leave Travel Allow.  = 8.333% of Basic        = ₹2,082.50
 *     Fixed Allowance      = Wage - sum(everything else above)
 *     PF (Employee)        = 12%   of Basic
 *     PF (Employer)        = 12%   of Basic
 *     Professional Tax     = flat (default ₹200)
 *
 * Every percentage is overridable per employee (see User.salary on
 * user.model.js) so HR can tune an individual's structure without this
 * module needing to change; components fall back to the spec's defaults
 * when an employee has no overrides yet.
 */

const DEFAULTS = {
  basicPercentOfWage: 50,
  hraPercentOfBasic: 50,
  standardAllowanceFlat: 4167,
  performanceBonusPercentOfBasic: 8.33,
  ltaPercentOfBasic: 8.333,
  pfEmployeePercentOfBasic: 12,
  pfEmployerPercentOfBasic: 12,
  professionalTaxFlat: 200,
};

const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;

/**
 * `overrides` is whatever is stored on User.salary.components — any
 * subset of the DEFAULTS keys. Returns the full breakdown plus totals.
 */
const computeSalaryBreakdown = (wage, overrides = {}) => {
  const cfg = { ...DEFAULTS, ...overrides };
  const wageAmount = Number(wage) || 0;

  const basic = round2((cfg.basicPercentOfWage / 100) * wageAmount);
  const hra = round2((cfg.hraPercentOfBasic / 100) * basic);
  const standardAllowance = round2(cfg.standardAllowanceFlat);
  const performanceBonus = round2((cfg.performanceBonusPercentOfBasic / 100) * basic);
  const lta = round2((cfg.ltaPercentOfBasic / 100) * basic);

  const beforeFixed = basic + hra + standardAllowance + performanceBonus + lta;
  // Never negative — a misconfigured wage/percentage combo should not
  // produce a nonsensical negative allowance.
  const fixedAllowance = round2(Math.max(0, wageAmount - beforeFixed));

  const grossEarnings = round2(beforeFixed + fixedAllowance);

  const pfEmployee = round2((cfg.pfEmployeePercentOfBasic / 100) * basic);
  const pfEmployer = round2((cfg.pfEmployerPercentOfBasic / 100) * basic);
  const professionalTax = round2(cfg.professionalTaxFlat);

  const totalDeductions = round2(pfEmployee + professionalTax);
  const netPay = round2(grossEarnings - totalDeductions);

  return {
    wage: round2(wageAmount),
    earnings: {
      basic,
      hra,
      standardAllowance,
      performanceBonus,
      lta,
      fixedAllowance,
    },
    deductions: {
      pfEmployee,
      professionalTax,
    },
    employerContributions: {
      pfEmployer,
    },
    grossEarnings,
    totalDeductions,
    netPay,
  };
};

/**
 * Scales net pay by payable days out of total working days in the period
 * — the spec's rule that unpaid leave / missing attendance reduces pay.
 */
const proratePay = (breakdown, payableDays, totalDays) => {
  if (!totalDays) return breakdown;
  const ratio = Math.min(1, Math.max(0, payableDays / totalDays));

  return {
    ...breakdown,
    payableDays,
    totalDays,
    proratedGross: round2(breakdown.grossEarnings * ratio),
    proratedNetPay: round2(breakdown.netPay * ratio),
  };
};

module.exports = { DEFAULTS, computeSalaryBreakdown, proratePay };
