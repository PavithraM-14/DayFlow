# Day Flow — Backend

Node.js + Express + MongoDB API, organized using MVC (Model–View–Controller,
adapted for a JSON API: Model–Controller–Route).

## Folder structure

```
backend/
├── src/
│   ├── config/        # DB connection and other configuration (db.js, ...)
│   ├── models/        # Mongoose schemas/models
│   ├── controllers/   # Request handlers / business logic
│   ├── routes/        # Express routers, mounted in routes/index.js
│   ├── middlewares/   # Auth, validation, error handling, etc.
│   ├── utils/         # Shared helpers
│   ├── app.js         # Express app setup (middleware, routes, error handler)
│   └── server.js      # Entry point — connects DB and starts the HTTP server
├── .env.example
├── .gitignore
└── package.json
```

## Getting started

```bash
cp .env.example .env
npm install
npm run dev      # nodemon
# or
npm start
```

The server exposes a health check at `GET /health` and mounts all API routes
under `/api` (see `src/routes/index.js`). Add feature routers, controllers,
and models under their respective folders as they are built.
