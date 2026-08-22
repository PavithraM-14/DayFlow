import styles from "./FormField.module.css";

export default function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  required = false,
}) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        name={id}
        className={styles.select}
        value={value}
        onChange={onChange}
        required={required}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
