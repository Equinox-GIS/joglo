/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["*.{html,js}", "./node_modules/flowbite/**/*.js"],
  theme: {
    screens: {
      xs: "320px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      fontFamily: {
        lobster: ['"Lobster"'],
        sf_pro_reguler: ["Font SF-Pro reguler"],
        sf_pro_bold: ["Font SF-Pro bold"],
        sf_pro_medium: ["Font SF-Pro medium"],
        recoleta: ["Font Recoleta"],
        grajon: ["Font Grajon"],
        grajon_bold: ["Font Grajon Bold"],
      },
    },
  },
  plugins: [require("flowbite/plugin")],
});
