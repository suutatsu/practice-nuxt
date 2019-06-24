import NuxtConfiguration from '@nuxt/config'
import pkg from './package.json'

const nuxtConfig: NuxtConfiguration = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  css: [
    'bulma',
    // プロジェクト内の SCSS ファイル
    '~/assets/main.scss',
    // プロジェクト内の CSS ファイル
    '~/assets/main.css'
  ],

  /*
   ** Customize the progress-bar color
   */
  loading: '~/components/loading.vue',

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {
      src: '~plugins/persistedstate.js',
      ssr: false
    }
  ],

  router: {
    middleware: 'stats'
  },

  watchQuery: true,

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'bootstrap-vue/nuxt'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  server: {
    port: 8000, // デフォルト: 3000
    host: '0.0.0.0' // デフォルト: localhost,
  },

  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:8000',
    SLACK_TOKEN:
      'xoxp-543573578821-544796620710-654136370371-ccb15ea7e3c02de7408f0a8f16d82cfc'
  },

  extensions: ['ts', 'js'],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        if (!config.module) return
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

export default nuxtConfig
