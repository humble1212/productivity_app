/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: { min: "340px", max: "767px" },
      md: { min: "768px", max: "1023px" },
      lg: { min: "1024px", max: "1279px" },
      xl: { min: "1280px", max: "1535px" },
      "2xl": { min: "1536px" },
    },

    extend: {
      height: {
        chgt: "69%",
        Ahgt: "75dvh",
        mhgt: "66dvh",
        mpHgt: "90dvh",
        upHgt: "82.5%",
        pHgt: "85dvh",
        Hgt: "92.5%",
        DtInpHgt: "64dvh",
        fcHgt: "28rem",
      },
      width: {
        cwdt: "40%",
      },
    },
  },
  plugins: [],
};
