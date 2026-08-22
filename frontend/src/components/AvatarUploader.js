"use client";

import { useEffect, useRef, useState } from "react";
import { fetchAvatarBlobUrl, updateAvatar } from "@/services/employees";

const initials = (name) =>
  (name || "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "?";

/**
 * Circular avatar that shows the employee's uploaded photo (falling back to
 * their initials) and, when `canEdit`, lets them replace it. Wires the
 * profile pages to the existing avatar endpoint — self or HR can upload.
 *
 * `className` styles the circle itself (size, background, border, and the
 * flex centering for the initials); `textClassName` sizes the initials.
 */
export default function AvatarUploader({
  employeeId,
  name,
  canEdit = false,
  className = "",
  textClassName = "",
  onUploaded,
}) {
  const [src, setSrc] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    let active = true;
    let current = null;
    if (employeeId) {
      fetchAvatarBlobUrl(employeeId).then((url) => {
        if (!active) {
          if (url) URL.revokeObjectURL(url);
          return;
        }
        current = url;
        setSrc(url);
      });
    }
    return () => {
      active = false;
      if (current) URL.revokeObjectURL(current);
    };
  }, [employeeId]);

  const handleFile = async (event) => {
    const file = event.target.files?.[0];
    if (!file || !employeeId) return;
    setBusy(true);
    setError("");
    const response = await updateAvatar(employeeId, file);
    if (inputRef.current) inputRef.current.value = "";
    if (response.success) {
      const url = await fetchAvatarBlobUrl(employeeId);
      setSrc((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return url;
      });
      onUploaded?.();
    } else {
      setError(response.message || "Could not update photo.");
    }
    setBusy(false);
  };

  return (
    <div className={`relative group overflow-hidden ${className}`}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={name || "Profile photo"} className="w-full h-full object-cover" />
      ) : (
        <span className={textClassName}>{initials(name)}</span>
      )}

      {canEdit && (
        <>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={busy}
            className="absolute inset-0 bg-black/45 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity disabled:opacity-100"
            title="Change photo"
            aria-label="Change profile photo"
          >
            <span className="material-symbols-outlined text-[20px]">
              {busy ? "hourglass_empty" : "photo_camera"}
            </span>
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            className="hidden"
            onChange={handleFile}
          />
        </>
      )}

      {error && (
        <p className="absolute top-full left-1/2 -translate-x-1/2 mt-1 text-error font-label-sm text-label-sm whitespace-nowrap">
          {error}
        </p>
      )}
    </div>
  );
}
