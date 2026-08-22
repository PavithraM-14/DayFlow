# Day Flow — Frontend

React + Next.js (JavaScript, App Router). The folder layout borrows MVC
naming so it pairs cleanly with the Express backend:

```
frontend/
├── public/             # Static assets
├── src/
│   ├── app/            # Next.js routes — layout.js, page.js, route segments
│   ├── components/     # Presentational / reusable UI components ("views")
│   ├── controllers/    # Page-level logic that coordinates services + state
│   ├── models/         # Client-side data shapes / entities
│   ├── services/       # API clients (calls to the Express backend)
│   ├── hooks/          # Custom React hooks
│   ├── context/        # React context providers
│   ├── utils/          # Shared helpers
│   ├── styles/         # Global/shared styles
│   └── config/         # Runtime configuration (API base URL, etc.)
├── .env.example
├── .eslintrc.json
├── .gitignore
├── jsconfig.json
├── next.config.js
└── package.json
```

## Getting started

```bash
cp .env.example .env.local
npm install
npm run dev
```

## Pages built so far

| Route | Purpose |
| --- | --- |
| `/` | Welcome/landing page — short project intro + feature grid |
| `/get-started` | Role picker — Employee ("Join already registered company") vs HR Officer ("Register your company to use Dayflow") |
| `/signup/employee` | Employee sign up — company dropdown (mock data, see below) + personal fields |
| `/signup/hr` | HR sign up — company name + logo upload + personal fields |
| `/login` | Sign in — Login ID/Email, password, "Forgot password?" |
| `/forgot-password` | Password reset request stub |

Form submission on the auth pages is UI-only for now (`TODO` comments mark
where each form will call the backend) since the corresponding Express
endpoints don't exist yet. The employee sign-up company dropdown reads from
`src/services/companies.js`, a temporary mock list — swap it for a real
`GET /api/companies` call once that route is built.

## Design system

The visual theme is based on Odoo's official brand — colors and font stack
pulled directly from Odoo's own SCSS source, not guessed:

- Primary purple `#714B67`, teal accent `#017E84`, system-font stack
  (no custom webfont for real UI text — matches Odoo's actual product).
- All tokens live as CSS variables in `src/app/globals.css` — new
  components should reference `var(--color-primary)` etc. rather than
  hardcoding hex values.
- One deliberate decorative exception: `components/MarkerHighlight.js`
  recreates the handwritten/highlighter-marker heading style from the
  project's own requirements doc, using the self-hosted Caveat font
  (`@fontsource/caveat`). It's reserved for short eyebrow labels only —
  never used on buttons, inputs, or body copy.
- Shared building blocks: `AuthCard` (centered card shell for all auth
  pages), `TextField` / `SelectField` / `PasswordField` / `CompanyLogoField`
  / `SubmitButton` / `InfoNote` (form primitives), `RoleCard` (the
  Get Started cards), `Navbar` / `Footer` / `Logo` / `FeatureCard`.

Full rationale and conventions are recorded in project memory
(`design_system.md`) for consistency as new pages are added.

## Next up

Dashboard, employee profile, attendance, and leave/time-off pages, wired
to the backend once its auth and data endpoints exist.
