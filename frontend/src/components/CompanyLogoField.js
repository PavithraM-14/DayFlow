"use client";

import { useRef, useState } from "react";
import fieldStyles from "./FormField.module.css";
import styles from "./CompanyLogoField.module.css";

/**
 * Company name input paired with a logo-upload icon button, matching the
 * "Company Name :- ____  [upload icon] -> Upload Logo" pattern from the
 * HR sign-up wireframe.
 */
export default function CompanyLogoField({
  id,
  label,
  value,
  onChange,
  placeholder,
  required = false,
}) {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setPreviewUrl(URL.createObjectURL(file));
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
        />
        <button
          type="button"
          className={styles.uploadBtn}
          onClick={() => fileInputRef.current?.click()}
          aria-label="Upload company logo"
          title="Upload company logo"
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
          accept="image/*"
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
        </div>
      )}
    </div>
  );
}
