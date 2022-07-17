export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "TFD E-Learning Admin",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [
      {
        src: "https://cdn.jsdelivr.net/npm/tw-elements/dist/js/index.min.js",
        body: true,
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/css/main.css", "@/assets/css/tailwind.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/vuex-persist.js", mode: "client" },
    { src: "~/plugins/vue-good-table.js", mode: "client" },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "@nuxtjs/moment",
  ],
  // Google Font
  googleFonts: {
    display: "swap",
    families: {
      Kantumruy: {
        wght: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      },
      "Noto Sans": {
        wght: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      },
    },
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios", "@nuxtjs/auth-next"],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  //Moment
  moment: {
    timezone: true,
    defaultTimezone: "Asia/Phnom_Penh",
  },

  // Nuxt Axios
  axios: {
    proxy: true,
    baseURL: process.env.BASE_URL || "http://localhost:80",
    // proxyHeaders: false,
    credentials: true,
  },
  proxy: {
    "/v1/": {
      target: `${process.env.BASE_URL}/v1`,
      pathRewrite: { "^/v1/": "" },
    },
    "/api/": {
      target: `${process.env.WEB_URL}/api`,
    },
  },
};
