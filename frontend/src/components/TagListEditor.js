"use client";

import { useState } from "react";

/**
 * Small add/remove chip list for skills, certifications, and anything
 * else that's "a handful of short strings" rather than a real form field.
 * Fully controlled — the parent owns the array and passes it back in via
 * `onChange` so it can be saved alongside the rest of a profile form.
 */
export default function TagListEditor({ value = [], onChange, placeholder = "Add an item", readOnly = false }) {
  const [draft, setDraft] = useState("");

  const addTag = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    if (value.some((item) => item.toLowerCase() === trimmed.toLowerCase())) {
      setDraft("");
      return;
    }
    onChange([...value, trimmed]);
    setDraft("");
  };

  const removeTag = (index) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addTag();
    }
  };

  if (readOnly) {
    return value.length === 0 ? (
      <p className="font-body-sm text-body-sm text-on-surface-variant">None added yet.</p>
    ) : (
      <div className="flex flex-wrap gap-2">
        {value.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="inline-flex items-center px-3 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm border border-outline-variant/50"
          >
            {item}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container text-on-primary-container font-label-sm text-label-sm"
          >
            {item}
            <button
              type="button"
              onClick={() => removeTag(index)}
              aria-label={`Remove ${item}`}
              className="hover:opacity-70"
            >
              <span className="material-symbols-outlined text-[14px] leading-none block">close</span>
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 bg-surface border border-outline-variant rounded-[10px] py-1.5 px-3 text-on-surface font-body-sm text-body-sm focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim focus:outline-none"
          placeholder={placeholder}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          onClick={addTag}
          className="px-3 py-1.5 rounded-[10px] bg-surface-container-highest text-on-surface font-label-sm text-label-sm hover:bg-surface-container-high transition-colors"
        >
          Add
        </button>
      </div>
    </div>
  );
}
