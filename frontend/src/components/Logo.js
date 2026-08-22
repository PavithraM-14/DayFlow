// Small inline wordmark: a plum "o" ring echoing Odoo's mark, followed by
// the Dayflow name. Kept as a component so it can be reused in the navbar,
// footer, and (later) the auth screens.
export default function Logo({ size = 28 }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        fontWeight: 700,
        fontSize: 20,
        letterSpacing: "-0.01em",
        color: "var(--color-text)",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="16"
          cy="16"
          r="12.5"
          stroke="var(--color-primary)"
          strokeWidth="5"
        />
      </svg>
      Dayflow
    </span>
  );
}
