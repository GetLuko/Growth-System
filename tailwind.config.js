/** @type {import('tailwindcss').Config} */

// import colors from "config/tailwind/colors";
// import screens from "config/tailwind/screens";
// import typo from "config/tailwind/typo";

module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    colors: require("./config/tailwind/colors"),
    extend: {},
    screens: require("./config/tailwind/screens"),
  },
  plugins: [
    ({ addUtilities, matchUtilities, config, theme }) => {
      addUtilities(require("./config/tailwind/typo"));
    },
  ],
};
