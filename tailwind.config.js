const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Noto Sans", "Kantumruy", ...defaultTheme.fontFamily.sans],
        serif: ["Noto Sans", "Kantumruy", ...defaultTheme.fontFamily.sans],
        mono: ["Noto Sans", "Kantumruy", ...defaultTheme.fontFamily.sans],
        display: ["Noto Sans", "Kantumruy", ...defaultTheme.fontFamily.sans],
        body: ["Noto Sans", "Kantumruy", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("tw-elements/dist/plugin"),
  ],
};
