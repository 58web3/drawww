export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'drawww',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: ''
      },
      {
        name: 'format-detection',
        content: 'telephone=no'
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },

  server: {
    host: '0.0.0.0',
    port: 3000,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    { src: 'vue-material/dist/vue-material.min.css', lang: 'css' },
    { src: 'vue-material/dist/theme/default.css', lang: 'css' },
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/vue-material',
  ],

  env: {
    CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
  },
  proxy: {
    '/v1': {
      target: process.env.API_URL,
      pathRewrite: {
        '^/v1': '/v1',
      },
    },
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    'nuxt-basic-auth-module',
    '@nuxtjs/dotenv',
    '@nuxtjs/i18n'
  ],

  i18n: {
    locales: [
      {
        code: 'jp',
        name: '日本語',
        file: 'jp.json'
      },
      {
        code: 'en',
        name: 'English',
        file: 'en.json'
      }
    ],
    lazy: true,
    langDir: 'lang/',
    defaultLocale: 'jp'
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}