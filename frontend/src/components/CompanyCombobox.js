"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./CompanyCombobox.module.css";

/**
 * Type-to-search picker for the registered companies.
 *
 * A plain <select> was fine against four mock names, but the list grows
 * with every company that signs up, so this filters as you type. It is
 * built on a text input rather than a <datalist> so the selection is a
 * company *id* — the visible text is only ever a label, and a typed name
 * that matches nothing selects nothing.
 *
 * Keyboard: ArrowUp/Down move, Enter picks, Escape closes.
 */
export default function CompanyCombobox({
  id = "company",
  label = "Company Name",
  companies,
  value, // selected company _id, or ""
  onChange, // (companyId) => void
  loading = false,
  error = "",
  disabled = false,
  required = false,
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const wrapRef = useRef(null);
  const listRef = useRef(null);

  const selected = useMemo(
    () => companies.find((c) => c._id === value) || null,
    [companies, value]
  );

  // While closed the input shows the selection; typing takes over only
  // once the list is open, so the field never looks empty after a pick.
  const inputValue = open ? query : selected?.name || "";

  const matches = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return companies;
    return companies.filter((c) => c.name.toLowerCase().includes(needle));
  }, [companies, query]);

  // Clamp the highlight whenever the result set shrinks under it.
  useEffect(() => {
    setActiveIndex((i) => (i >= matches.length ? 0 : i));
  }, [matches.length]);

  // Click-away closes and discards whatever was half-typed.
  useEffect(() => {
    if (!open) return undefined;

    const onPointerDown = (e) => {
      if (!wrapRef.current?.contains(e.target)) {
        setOpen(false);
        setQuery("");
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  // Keep the highlighted row inside the scroll box.
  useEffect(() => {
    if (!open) return;
    const node = listRef.current?.children?.[activeIndex];
    node?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open]);

  const pick = (company) => {
    onChange(company._id);
    setOpen(false);
    setQuery("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      const step = e.key === "ArrowDown" ? 1 : -1;
      setActiveIndex((i) => {
        if (!matches.length) return 0;
        return (i + step + matches.length) % matches.length;
      });
      return;
    }

    if (e.key === "Enter") {
      // Only swallow Enter when it is choosing something; otherwise let
      // it submit the form as usual.
      if (open && matches[activeIndex]) {
        e.preventDefault();
        pick(matches[activeIndex]);
      }
      return;
    }

    if (e.key === "Escape" && open) {
      e.preventDefault();
      setOpen(false);
      setQuery("");
    }
  };

  const placeholder = loading
    ? "Loading companies..."
    : companies.length
    ? "Search for your company"
    : "No companies registered yet";

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>

      <div className={styles.control}>
        <input
          id={id}
          name={id}
          className={styles.input}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={`${id}-list`}
          aria-autocomplete="list"
          autoComplete="off"
          value={inputValue}
          placeholder={placeholder}
          disabled={disabled || loading || !companies.length}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActiveIndex(0);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          // Kept for form validation only: the real value is the id below.
          required={required && !value}
        />

        {/* The id is what actually gets submitted. */}
        <input type="hidden" name={`${id}Id`} value={value || ""} />

        {selected && !open ? (
          <button
            type="button"
            className={styles.trailing}
            onClick={() => {
              onChange("");
              setQuery("");
              setOpen(true);
            }}
            aria-label="Clear selected company"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        ) : (
          <span className={styles.trailing} aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        )}

        {open && (
          <ul className={styles.list} id={`${id}-list`} role="listbox" ref={listRef}>
            {matches.length === 0 ? (
              <li className={styles.empty}>
                No company matches “{query.trim()}”. Ask your HR to register
                your company first.
              </li>
            ) : (
              matches.map((company, index) => (
                <li key={company._id}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={company._id === value}
                    className={[
                      styles.option,
                      index === activeIndex ? styles.optionActive : "",
                      company._id === value ? styles.optionSelected : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    // Mouse-down would fire the click-away handler first.
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => pick(company)}
                  >
                    <span className={styles.initial} aria-hidden="true">
                      {company.name.charAt(0).toUpperCase()}
                    </span>
                    <span>{company.name}</span>
                  </button>
                </li>
              ))
            )}
          </ul>
        )}
      </div>

      {error ? (
        <p className={`${styles.hint} ${styles.error}`}>{error}</p>
      ) : (
        <p className={styles.hint}>
          Can&apos;t find it? Your company&apos;s HR has to register it first.
        </p>
      )}
    </div>
  );
}
