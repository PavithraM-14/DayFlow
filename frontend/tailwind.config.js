/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
      extend: {
          "colors": {
              "secondary": "#00696e",
              "tertiary-fixed": "#ffd7f1",
              "on-primary-container": "#f0bfe0",
              "on-error-container": "#93000a",
              "on-tertiary-fixed-variant": "#5c3d54",
              "surface-container-highest": "#e9e0e4",
              "outline-variant": "#d1c3ca",
              "surface-tint": "#79526f",
              "on-secondary": "#ffffff",
              "on-secondary-container": "#006e73",
              "on-primary": "#ffffff",
              "on-surface": "#1e1a1d",
              "on-tertiary-fixed": "#2c1227",
              "background": "#fff7fa",
              "secondary-container": "#92eff5",
              "surface-container": "#f5ebef",
              "primary-fixed-dim": "#e9b8d9",
              "outline": "#80747a",
              "on-secondary-fixed-variant": "#004f53",
              "surface-container-low": "#fbf1f5",
              "surface-dim": "#e1d8dc",
              "primary-container": "#714b67", /* Updated to match Odoo */
              "error": "#ba1a1a",
              "tertiary": "#55364d",
              "on-surface-variant": "#4e444a",
              "on-background": "#1e1a1d",
              "tertiary-fixed-dim": "#e4bad7",
              "inverse-primary": "#e9b8d9",
              "on-error": "#ffffff",
              "on-tertiary": "#ffffff",
              "primary": "#714b67", /* Updated to match Odoo */
              "surface-container-high": "#efe6ea",
              "tertiary-container": "#6e4d65",
              "surface-variant": "#e9e0e4",
              "error-container": "#ffdad6",
              "on-primary-fixed": "#2f1029",
              "surface-container-lowest": "#ffffff",
              "on-secondary-fixed": "#002022",
              "surface-bright": "#fff7fa",
              "surface": "#fff7fa",
              "on-tertiary-container": "#ecc1de",
              "on-primary-fixed-variant": "#5f3b56",
              "primary-fixed": "#ffd7f1",
              "inverse-on-surface": "#f8eef2",
              "secondary-fixed-dim": "#78d5db",
              "inverse-surface": "#342f32",
              "secondary-fixed": "#95f1f8"
          },
          "borderRadius": {
              "DEFAULT": "0.25rem",
              "lg": "0.5rem",
              "xl": "0.75rem",
              "full": "9999px"
          },
          "spacing": {
              "max-width": "1120px",
              "margin-mobile": "16px",
              "container-padding": "32px",
              "gutter": "24px",
              "unit-base": "8px"
          },
          "fontFamily": {
              "headline-lg-mobile": ["var(--font-sans)", "sans-serif"],
              "body-md": ["var(--font-sans)", "sans-serif"],
              "body-sm": ["var(--font-sans)", "sans-serif"],
              "accent-marker": ["Caveat", "cursive"],
              "headline-lg": ["var(--font-sans)", "sans-serif"],
              "label-sm": ["var(--font-sans)", "sans-serif"],
              "display-lg": ["var(--font-sans)", "sans-serif"],
              "title-md": ["var(--font-sans)", "sans-serif"]
          },
          "fontSize": {
              "headline-lg-mobile": ["24px", { "lineHeight": "32px", "fontWeight": "600" }],
              "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
              "body-sm": ["14px", { "lineHeight": "20px", "fontWeight": "400" }],
              "accent-marker": ["20px", { "lineHeight": "20px", "fontWeight": "400" }],
              "headline-lg": ["32px", { "lineHeight": "40px", "fontWeight": "600" }],
              "label-sm": ["12px", { "lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "500" }],
              "display-lg": ["48px", { "lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
              "title-md": ["18px", { "lineHeight": "24px", "fontWeight": "600" }]
          }
      }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
}
