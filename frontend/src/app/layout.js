// Self-hosted (no external CDN calls at runtime or build time) handwriting
// face for the marker-highlight accent only — see components/MarkerHighlight.
// Odoo's own UI uses a plain system-sans stack everywhere else; this is a
// deliberate, limited decorative exception.
import "@fontsource/caveat/600.css";
import "@fontsource/caveat/700.css";
import "./globals.css";

export const metadata = {
  title: "Dayflow — HR Management System",
  description:
    "Dayflow is a human resource management system for employee profiles, attendance, leave, and payroll visibility — every workday, perfectly aligned.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
