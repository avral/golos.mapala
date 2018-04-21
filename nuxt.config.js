const path = require('path')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'mapala-next-b',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [

      // Font Awesome
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'},

      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ]
  },
  css: [
    '@fortawesome/fontawesome/styles.css',

    '@/assets/css/sb-admin.css',
    '@/assets/css/main.css',
  ],
  modules: [
    'bootstrap-vue/nuxt',
  ],
  plugins: [
    '@/plugins/vue-google-maps',
    '@/plugins/infiniteload.js',
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

      //config.module.rules.splice(0, 0, {
      //  test: /\.js$/,
      //  include: [path.resolve(__dirname, './node_modules/vue2-google-maps')],
      //  loader: 'babel-loader',
      //})
    }
  },

  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'post',
        path: '/@:author/:permlink',
        component: resolve(__dirname, 'components/post/Post.vue')
      })
    }
  }
}