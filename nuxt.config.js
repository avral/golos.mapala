const path = require('path')

module.exports = {
  env: {
    PROD: process.env.PROD || false,
    API_QL_URL: process.env.API_QL_URL || 'http://localhost:5000/graphql'
  },

  /*
  ** Headers of the page
  */
  head: {
    title: 'Mapala Travel Community',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'MAPALA - World Adventure Community. Connecting with people, Be Useful, Enjoy, Repeat.' }
    ],
    link: [

      // Font Awesome
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'},
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ]
  },
  css: [
    '@fortawesome/fontawesome/styles.css',

    '@/assets/css/main.css',
  ],
  modules: [
    '@nuxtjs/apollo',
    'bootstrap-vue/nuxt',
    /// '@/modules/custom-generate-routes.js',
  ],
  apollo: {
    clientConfigs: {
      default: '@/config/apollo'
    }
  },
  plugins: [
    // Плагин в котором лежат все вызовы при запуске клиента
    {ssr: false, src: '@/plugins/startapp.js'},

    {ssr: false, src: '@/plugins/localStorage.js'},
    {ssr: false, src: '@/plugins/vuelidate.js'},
    {ssr: false, src: '@/plugins/vue-quill-editor.js'},
    {ssr: false, src: '@/plugins/vue-notification.js'},

    '@/plugins/vue-google-maps',
    '@/plugins/infiniteload.js',
    '@/plugins/filters.js',
    '@/plugins/vuex-router-sync.js',
    '@/plugins/elements.js',
    '@/plugins/element-ui.js',
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
  },

  router: {
    linkActiveClass: 'active',

    extendRoutes(routes, resolve) {
      routes.push({
        name: 'author_feed',
        path: '/@:author',
        component: resolve(__dirname, 'pages/author.vue')
      })

      routes.push({
        name: 'post',
        path: '/@:author/:permlink',
        component: resolve(__dirname, 'components/post/Post.vue')
      })
    }
  },
}
