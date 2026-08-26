import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        venuexTheme: {
          "primary": "#065F46",     // Deep Emerald Green
          "secondary": "#D97706",   // Warm Gold
          "accent": "#F59E0B",      // Bright Amber
          "neutral": "#1F2937",      // Dark Slate for Text
          "base-100": "#F9FAFB",    // Soft Off-white Background
          "info": "#3B82F6",
          "success": "#10B981",
          "warning": "#F59E0B",
          "error": "#EF4444",
        },
      },
    ],
  },
};

export default config;