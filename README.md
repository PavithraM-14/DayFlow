# Day Flow

A Human Resource Management System (HRMS) — employee profiles, attendance,
leave/time-off, and payroll visibility for HR teams and employees.
Tagline: *"Every workday, perfectly aligned."*

- **Frontend** — React + Next.js (JavaScript), see `frontend/README.md`
- **Backend** — Node.js + Express + MongoDB (MVC), see `backend/README.md`

## Layout

```
Day-Flow/
├── frontend/   # React + Next.js app
└── backend/    # Express API + MongoDB, MVC architecture
```

Each app has its own `package.json`, `.env.example`, and README with setup
instructions. Run them independently:

```bash
# Terminal 1
cd backend && cp .env.example .env && npm install && npm run dev

# Terminal 2
cd frontend && cp .env.example .env.local && npm install && npm run dev
```

Backend defaults to `http://localhost:5000`, frontend to
`http://localhost:3000`.

## Current status

**Frontend** — welcome page and the full onboarding/auth flow are built
and styled to Odoo's official brand (colors and font stack taken from
Odoo's own SCSS source):

- `/` — welcome page with a short project intro and feature overview
- `/get-started` — Employee vs HR Officer role picker
- `/signup/employee`, `/signup/hr` — role-specific sign up forms
- `/login`, `/forgot-password` — sign in and password reset

These forms are UI-only for now (see `frontend/README.md` for details) —
they're ready to wire up once the backend exposes auth endpoints.

**Backend** — MVC scaffold only (`config`, `models`, `controllers`,
`routes`, `middlewares`, `utils`) with a working DB connection, health
check, and no feature routes yet. Auth endpoints (`/api/auth/signup`,
`/api/auth/login`, `/api/companies`, etc.) are the logical next step to
match what the frontend already expects.

Design decisions and full page/component conventions are recorded in
project memory for consistency as new pages are built.
