import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'universal',
  // server: {
  //   host: '0.0.0.0',
  //   port: 8083
  // },
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: 'OrderList',
    // titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || 'Order',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: './static/favicon.ico' },
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#FF6347' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
   {src: '~/plugins/vuetify.js', ssr: false}
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/moment',
    '@nuxtjs/auth'
  ],
  icon:{
    iconSrc: './static/icon.png'
  },
  pwa: {
    meta: {
      title: 'Harem Pvc OrderApp',
      author: 'Z.Mira',
    },
    manifest: {
      name: 'Order Pvc && Aluminum Client Application',
      short_name: 'Order App',
      start_url: '/',
      themeColor: '#202225',
      lang: 'en',
    },
  },
  moment:{
    timezone: true
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    // baseURL: 'http://localhost:8000/api/',
    // baseURL: 'http://192.168.1.12:8000/api/',
    baseURL: 'http://ec2-18-184-87-117.eu-central-1.compute.amazonaws.com/api/',

  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    // theme: {
    //   dark: false,
    //   themes: {
    //     dark: {
    //       primary: colors.blue.darken2,
    //       accent: colors.grey.darken3,
    //       secondary: colors.amber.darken3,
    //       info: colors.teal.lighten1,
    //       warning: colors.amber.base,
    //       error: colors.deepOrange.accent4,
    //       success: colors.green.accent3
    //     }
    //   }
    // }
  },
  /*
  ** Build configuration
  */
  build: {
    // analyze: true,
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/user/token/', method: 'post', propertyName: "token", altProperty: 'refresh'},
          user: false,
          logout: false,
          tokenRequired: true,
        }
      }
    }
  }
}
