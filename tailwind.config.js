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
        // roboto: ['"Roboto"'],
        instagram_reguler: ["Font Instagram reguler"],
        instagram_bold: ["Font Instagram bold"],
        instagram_medium: ["Font Instagram medium"],
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
