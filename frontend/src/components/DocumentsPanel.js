"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { deleteDocument, downloadDocument, listDocuments, uploadDocument } from "@/services/documents";

const formatSize = (bytes) => {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const formatDate = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "—"
    : date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
};

/**
 * Resume/certificates/ID-proof storage — the PDF's "Documents" bullet
 * under View Profile (3.3.1) and the wireframe's "Resume" tab. Shared
 * between the HR-viewing-an-employee page and the employee's own profile
 * page so upload/list/download/delete behave identically on both.
 */
export default function DocumentsPanel({ employeeId, canUpload = true }) {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [busyId, setBusyId] = useState(null);
  const fileInputRef = useRef(null);

  const load = useCallback(async () => {
    if (!employeeId) return;
    setLoading(true);
    const response = await listDocuments(employeeId);
    if (response.success) {
      setDocuments(response.data?.documents || []);
      setError("");
    } else {
      setError(response.message || "Could not load documents.");
    }
    setLoading(false);
  }, [employeeId]);

  useEffect(() => {
    load();
  }, [load]);

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setUploading(true);
    setError("");
    const response = await uploadDocument(employeeId, file);
    setUploading(false);

    if (response.success) {
      load();
    } else {
      setError(response.message || "Could not upload that file.");
    }
  };

  const handleDownload = async (doc) => {
    setBusyId(doc._id);
    const result = await downloadDocument(doc._id, doc.fileName);
    setBusyId(null);
    if (!result.success) setError(result.message || "Could not download that file.");
  };

  const handleDelete = async (doc) => {
    setBusyId(doc._id);
    const response = await deleteDocument(doc._id);
    setBusyId(null);
    if (response.success) {
      load();
    } else {
      setError(response.message || "Could not remove that file.");
    }
  };

  return (
    <div>
      {error && (
        <div className="mb-3 flex items-start gap-2 p-2.5 rounded-lg bg-error-container text-on-error-container font-body-sm text-body-sm" role="alert">
          <span className="material-symbols-outlined text-[16px]">error</span>
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <p className="font-body-sm text-body-sm text-on-surface-variant">Loading…</p>
      ) : documents.length === 0 ? (
        <p className="font-body-sm text-body-sm text-on-surface-variant mb-3">
          No documents uploaded yet — resume, certificates, or ID proof can go here.
        </p>
      ) : (
        <div className="divide-y divide-outline-variant mb-3">
          {documents.map((doc) => (
            <div key={doc._id} className="py-2.5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="material-symbols-outlined text-outline">description</span>
                <div className="min-w-0">
                  <p className="font-body-sm text-body-sm text-on-surface truncate">{doc.fileName}</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                    {formatSize(doc.size)} · {formatDate(doc.createdAt)}
                    {doc.uploadedBy?.name ? ` · by ${doc.uploadedBy.name}` : ""}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  type="button"
                  disabled={busyId === doc._id}
                  onClick={() => handleDownload(doc)}
                  title="Download"
                  className="w-8 h-8 rounded-full hover:bg-surface-container-highest flex items-center justify-center text-on-surface-variant disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-[18px]">download</span>
                </button>
                <button
                  type="button"
                  disabled={busyId === doc._id}
                  onClick={() => handleDelete(doc)}
                  title="Remove"
                  className="w-8 h-8 rounded-full hover:bg-error-container hover:text-on-error-container flex items-center justify-center text-on-surface-variant disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {canUpload && (
        <>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="px-4 py-2 rounded-lg bg-surface-container-highest text-on-surface font-label-sm text-label-sm hover:bg-surface-container-high transition-colors flex items-center gap-2 disabled:opacity-60"
          >
            <span className="material-symbols-outlined text-[18px]">upload</span>
            {uploading ? "Uploading…" : "Upload Document"}
          </button>
          <p className="font-label-sm text-label-sm text-on-surface-variant mt-1.5">PDF, Word, or image — up to 10 MB.</p>
        </>
      )}
    </div>
  );
}
