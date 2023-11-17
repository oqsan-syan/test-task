/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    colors: {
      primary: "#0F172A",
      secondary: "#475569",
      blue: "#0EA5E9",
      darkBlue: "#0284C7",
      grey: "#E2E8F0",
      red: "#F87171",
      placeholder: "#94A3B8",
      white: "#fff",
      lightGrey: "#F1F5F9",
    },
    boxShadow: {
      inputFocused: "0px 0px 0px 2px #BAE6FD",
      selectBtn:
        "0px 1px 2px -1px rgba(0, 0, 0, 0.10), 0px 1px 3px 0px rgba(0, 0, 0, 0.10);",
    },
    gridTemplateColumns: {
      "30/70": "30% 70%",
      "40/60": "40% 60%",
    },
    extend: {},
  },
  plugins: [],
};
