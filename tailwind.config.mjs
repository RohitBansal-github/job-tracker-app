/** @type {import('tailwindcss').Config} */
import animate from "tailwindcss-animate";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        background: "var(--background)",
        "card-bg": "var(--card-bg)",
        danger: "var(--danger)",
        success: "var(--success)",
        warning: "var(--warning)",
      },
    },
  },
  plugins: [animate],
};
