/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      spacing: {
        "8xl": "96rem",
        "9xl": "128rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      colors: {
        primary: "#E74646",
        secondary: "#FA9884",
        muted: "#FFE5CA",
        pastel: "#FFFBF5",
        light: "#F7F1EB",
        pastelBlue: "#ECF2FF",
        foo:"#ffffff"
      },
    },
  },
  plugins: [],
};
