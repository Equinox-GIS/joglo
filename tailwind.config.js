/** @type {import('tailwindcss').Config} */
module.exports = {
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
        sf_pro_reguler_new: ["Font SF-Pro-Text-Regular"],
        sf_pro_bold_new: ["Font SF-Pro-Text-Bold-Italic"],
        sf_pro_bold_judul_new: ["Font SF-Pro-Text-Bold"],
        sf_pro_medium: ["Font SF-Pro medium"],
        recoleta: ["Font Recoleta"],
        grajon: ["Font Grajon"],
        grajon_bold: ["Font Grajon Bold"],
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
