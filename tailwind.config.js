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
  darkMode: "class",
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
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          primary: "#1f2937",
        },
      },
    ],
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("daisyui"),
  ],
};
