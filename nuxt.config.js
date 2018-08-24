const path = require('path')

module.exports = {
  env: {
    PROD: process.env.PROD || false,
    API_QL_URL: process.env.API_QL_URL || 'http://localhost:5000/graphql',
    BACKEND_API: process.env.BACKEND_API || 'http://127.0.0.1:8000/api/',
    SENTRY_DSN: process.env.SENTRY_DSN || null,
    // TODO Поменять везде базовый урл
    BASE_URL: process.env.BASE_URL || 'http://localhost:3000/',
  },

  /*
  ** Headers of the page
  */
  head: {
    title: 'Mapala | Пиши о путешествиях, зарабатывай, путешествуй. Повторяй бесконечно.',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description',
        name: 'description',
        content: 'Mapala.net — это глобальная туристическая база знаний, социальная сеть и корпорация нового поколения. На данном этапе развития проекта вы можете писать статьи о ваших путешествиях и интересных местах и получать за это вознаграждение.'
      },
      { property: 'og:image', content: '/mapala.png' },
			{ name:"msapplication-TileColor", content: "#da532c"},
			{ name:"theme-color", content: "#ffffff"}

    ],

    link: [
			{ rel: "apple-touch-icon",  sizes: "180x180", href: "/apple-touch-icon.png"},
			{ rel: "manifest", href: "/site.webmanifest"},
    	{ rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#5bbad5"},
			{ rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png"},
			{ rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png"},
    ],
  },
  css: [
    '@/assets/css/main.css',
  ],
  modules: [
    '@nuxtjs/apollo',
    '@nuxtjs/sentry',
    'bootstrap-vue/nuxt',
    'nuxt-device-detect',
    '@nuxtjs/font-awesome',
    [
      '@nuxtjs/yandex-metrika',
      {
        id: '50068957',
        webvisor: true,
        clickmap:true,
        // useCDN:false,
        // trackLinks:true,
        // accurateTrackBounce:true,
      }
    ],
    /// '@/modules/custom-generate-routes.js',
  ],
  apollo: {
    clientConfigs: {
      default: '~/config/apollo'
    }
  },
  plugins: [
    // Плагин в котором лежат все вызовы при запуске клиента
    {ssr: false, src: '~/plugins/startapp.js'},

    {ssr: false, src: '~/plugins/localStorage.js'},
    {ssr: false, src: '~/plugins/vuelidate.js'},
    {ssr: false, src: '~/plugins/vue-quill-editor.js'},
    {ssr: false, src: '~/plugins/vue-notification.js'},
    {ssr: false, src: '~/plugins/vue-clipboard2.js'},

    '~/plugins/vue-js-modal',
    '~/plugins/vue-google-maps',
    '~/plugins/infiniteload.js',
    '~/plugins/filters.js',
    '~/plugins/vuex-router-sync.js',
    '~/plugins/elements.js',
    '~/plugins/element-ui.js',
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
        name: 'account',
        path: '/@:account',
        component: resolve(__dirname, 'pages/AccountPage.vue')
      })

      routes.push({
        name: 'post',
        path: '/@:author/:permlink',
        component: resolve(__dirname, 'components/post/PostSinglePage.vue')
      })
    }
  },

  loading: {
    color: 'white',
    height: '3px'
  }
}
