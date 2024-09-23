export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: process.env.TARGET,

  ssr: process.env.SSR,

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
    script: [],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/css/main.css", "@/assets/css/tailwind.css"],

  server: {
    host: process.env.HOST_URL,
    port: process.env.PORT,
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/vuex-persist.js", mode: "client" },
    { src: "~/plugins/vue-good-table.js", mode: "client" },
    { src: "~/plugins/vee-validate.js", mode: "client" },
    { src: "~/plugins/vue-select.js", mode: "client" },
    { src: "~/plugins/country-flag.js", mode: "client" },
    { src: "~/plugins/v-lazy-image.js", mode: "client" },
    { src: "~/plugins/disable-auto-complete.js", mode: "client" },
    { src: "~/plugins/i18n.js" },
    { src: "~/plugins/axios.js" },
    { src: "~/plugins/moment.js" },
    { src: "~/plugins/injector.js" },
    { src: "~/plugins/vue2-filters" },
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
      "Ubuntu Mono": {
        wght: [400],
      },
    },
  },

  /**
   * Toast Config
   */
  toast: {
    className: "rounded-lg text-base mx-auto mt-24 p-4 shadow-lg",
    position: "top-center",
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/auth-next",
    "nuxt-i18n",
    "@nuxtjs/toast",
    "vue2-editor/nuxt",
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["vee-validate/dist/rules"],
  },
  //Moment

  moment: {
    timezone: true,
    defaultTimezone: "Asia/Phnom_Penh",
    defaultLocale: "km",
    locales: ["km"],
  },
  // i18n options
  i18n: {
    detectBrowserLanguage: false,
    locales: [
      {
        code: "en",
        iso: "en-US",
        file: "en-US.js",
        dir: "ltr",
        moment: "en",
      },
      {
        code: "km",
        iso: "kh-KH",
        file: "kh-KH.js",
        dir: "ltr",
        moment: "km",
      },
    ],
    defaultLocale: "km",
    fallbackLocale: "km",
    // rootRedirect: "kh",
    // strategy: "prefix",
    noPrefixDefaultLocale: true,
    lazy: true,
    loadLanguagesAsync: true,
    langDir: "locales/",
    vueI18n: {
      fallbackLocale: "km",
      messages: {
        "en-US": require("./locales/en-US"),
        "kh-KH": require("./locales/kh-KH"),
      },
    },
  },

  // Nuxt Axios
  axios: {
    /**
     * Proxy and BaseURL can't be used at the same time
     */
    proxy: process.env.PROXY,
  },
  proxy: {
    "/v1/": {
      target: `${process.env.BASE_URL}/v1`,
      pathRewrite: { "^/v1/": "" },
    },
  },
  // Nuxt Auth Plugin
  auth: {
    redirect: {
      login: "/",
      logout: "/",
      callback: false,
      home: false,
    },
    rewriteRedirects: false,
    strategies: {
      local: {
        scheme: "refresh",
        token: {
          property: "accessToken",
          required: true,
          type: "Bearer",
          global: true,
          maxAge: 3600,
        },
        refreshToken: {
          property: "refreshToken",
          data: "refreshToken",
          maxAge: 604800,
        },
        user: {
          property: false,
          autoFetch: true,
        },
        endpoints: {
          login: {
            url: "v1/auth/admin-login",
            method: "post",
          },
          refresh: { url: "v1/auth/refresh", method: "get" },
          logout: { url: "v1/auth/logout", method: "get" },
          user: { url: "v1/auth/me", method: "get" },
        },
        autoLogout: true,
      },
    },
  },
  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL || "http://localhost:80",
    nodeEnv: process.env.NODE_ENV || "dev",
  },
  privateRuntimeConfig: {
    baseURL: process.env.BASE_URL || "http://localhost:80",
    nodeEnv: process.env.NODE_ENV || "dev",
  },
};
