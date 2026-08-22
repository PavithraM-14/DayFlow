"use client";

import { useEffect, useRef, useState } from "react";
import fieldStyles from "./FormField.module.css";
import styles from "./CompanyLogoField.module.css";

/**
 * Company name input paired with a logo-upload icon button, matching the
 * "Company Name :- ____  [upload icon] -> Upload Logo" pattern from the
 * HR sign-up wireframe.
 *
 * The chosen File is handed to the parent through `onFileChange` so the
 * form can post it (the backend stores the bytes on the Company document
 * — see backend/src/models/company.model.js).
 */
export default function CompanyLogoField({
  id,
  label,
  value,
  onChange,
  onFileChange,
  placeholder,
  required = false,
  disabled = false,
  maxSizeMb = 2,
}) {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [error, setError] = useState("");

  // Object URLs are leaked memory until explicitly revoked.
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const clearFile = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFileName("");
    setPreviewUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    onFileChange?.(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Mirrors the server-side cap in backend/src/middlewares/upload.js, so
    // an oversized file is caught before the upload starts.
    if (file.size > maxSizeMb * 1024 * 1024) {
      setError(`Logo must be smaller than ${maxSizeMb} MB`);
      clearFile();
      return;
    }

    setError("");
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFileName(file.name);
    setPreviewUrl(URL.createObjectURL(file));
    onFileChange?.(file);
  };

  return (
    <div className={fieldStyles.field}>
      <label className={fieldStyles.label} htmlFor={id}>
        {label}
      </label>
      <div className={styles.row}>
        <input
          id={id}
          name={id}
          type="text"
          className={`${fieldStyles.input} ${styles.input}`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
        />
        <button
          type="button"
          className={styles.uploadBtn}
          onClick={() => fileInputRef.current?.click()}
          aria-label="Upload company logo"
          title="Upload company logo"
          disabled={disabled}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/svg+xml"
          hidden
          onChange={handleFileChange}
        />
      </div>

      {fileName && (
        <div className={styles.preview}>
          {previewUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={previewUrl} alt="Company logo preview" className={styles.thumb} />
          )}
          <span className={styles.fileName}>{fileName}</span>
          <button
            type="button"
            className={styles.removeBtn}
            onClick={clearFile}
            disabled={disabled}
          >
            Remove
          </button>
        </div>
      )}

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
