const express = require("express");

const { requireAuth } = require("../middlewares/auth");
const { uploadDocument: uploadDocumentMiddleware } = require("../middlewares/upload");
const {
  listDocuments,
  uploadDocument,
  downloadDocument,
  deleteDocument,
} = require("../controllers/document.controller");

const router = express.Router();

router.use(requireAuth);

router.get("/", listDocuments);
router.post("/", uploadDocumentMiddleware, uploadDocument);
router.get("/:id", downloadDocument);
router.delete("/:id", deleteDocument);

module.exports = router;
