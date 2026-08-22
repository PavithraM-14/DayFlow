/**
 * Strips any object key that starts with "$" or contains "." from
 * req.body/req.params — the shapes Mongo/Mongoose treat as query
 * operators or path separators. Defense in depth against NoSQL
 * injection: every controller already builds its queries from specific,
 * expected fields (email, id, etc.), but a client can still send extra
 * JSON keys the controller never asked for, and Express 5 makes req.query
 * read-only (no setter), so this only rewrites body/params in place —
 * those two are writable and are the only place user JSON free-form
 * objects can smuggle an operator into (e.g. an `email` field that is
 * itself `{ "$ne": null }` rather than a string).
 */
const isPlainObject = (value) =>
  value !== null && typeof value === "object" && !Array.isArray(value);

const stripOperators = (value, depth = 0) => {
  if (depth > 6 || !isPlainObject(value)) return value;

  Object.keys(value).forEach((key) => {
    if (key.startsWith("$") || key.includes(".")) {
      delete value[key];
      return;
    }
    if (isPlainObject(value[key])) {
      stripOperators(value[key], depth + 1);
    } else if (Array.isArray(value[key])) {
      value[key].forEach((item) => stripOperators(item, depth + 1));
    }
  });

  return value;
};

const sanitizeInput = (req, res, next) => {
  // express.json()/express.urlencoded() only ever set req.body when the
  // request's Content-Type matches — a bodyless request (e.g. a PATCH with
  // no fields to send) leaves it undefined, which then throws in any
  // controller that reads a property off it (`req.body.comments`, etc.).
  // Normalizing here, once, means no controller has to guard for it.
  if (!req.body) req.body = {};
  if (isPlainObject(req.body)) stripOperators(req.body);
  if (isPlainObject(req.params)) stripOperators(req.params);
  next();
};

module.exports = { sanitizeInput };
