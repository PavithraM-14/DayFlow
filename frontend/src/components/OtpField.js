"use client";

import { useEffect, useRef } from "react";
import styles from "./OtpField.module.css";

const LENGTH = 6;

/**
 * Six single-character boxes that behave like one input: typing advances,
 * backspace steps back, and pasting a full code fills every box at once.
 *
 * `value` is the whole code as a string; `onChange` receives the whole
 * code, so the parent never has to track per-box state.
 */
export default function OtpField({ id = "otp", label, value, onChange, disabled }) {
  const inputsRef = useRef([]);
  const digits = value.padEnd(LENGTH, " ").slice(0, LENGTH).split("");

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const setDigit = (index, digit) => {
    const next = digits.map((d, i) => (i === index ? digit : d));
    onChange(next.join("").replace(/\s/g, ""));
  };

  const handleChange = (index) => (e) => {
    const typed = e.target.value.replace(/\D/g, "");
    if (!typed) {
      setDigit(index, " ");
      return;
    }

    // Handles both a single keystroke and a paste landing in one box.
    if (typed.length > 1) {
      const filled = digits.slice();
      typed
        .slice(0, LENGTH - index)
        .split("")
        .forEach((digit, offset) => {
          filled[index + offset] = digit;
        });
      onChange(filled.join("").replace(/\s/g, ""));
      inputsRef.current[Math.min(index + typed.length, LENGTH - 1)]?.focus();
      return;
    }

    setDigit(index, typed);
    if (index < LENGTH - 1) inputsRef.current[index + 1]?.focus();
  };

  const handleKeyDown = (index) => (e) => {
    if (e.key === "Backspace" && !digits[index].trim() && index > 0) {
      e.preventDefault();
      setDigit(index - 1, " ");
      inputsRef.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) inputsRef.current[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, LENGTH);
    if (!pasted) return;
    e.preventDefault();
    onChange(pasted);
    inputsRef.current[Math.min(pasted.length, LENGTH - 1)]?.focus();
  };

  return (
    <div className={styles.wrap}>
      {label && (
        <label className={styles.label} htmlFor={`${id}-0`}>
          {label}
        </label>
      )}
      <div className={styles.boxes} onPaste={handlePaste}>
        {digits.map((digit, index) => (
          <input
            key={index}
            id={`${id}-${index}`}
            ref={(el) => {
              inputsRef.current[index] = el;
            }}
            className={styles.box}
            type="text"
            inputMode="numeric"
            autoComplete={index === 0 ? "one-time-code" : "off"}
            maxLength={LENGTH}
            value={digit.trim()}
            onChange={handleChange(index)}
            onKeyDown={handleKeyDown(index)}
            disabled={disabled}
            aria-label={`Digit ${index + 1} of ${LENGTH}`}
          />
        ))}
      </div>
    </div>
  );
}
