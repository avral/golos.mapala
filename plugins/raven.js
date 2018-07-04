import Vue from 'vue'

import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'

import config from '@/config'


if (process.env.PROD) {
  Raven
      .config('https://e1af279ea5274be9b46372036f20b5ac@sentry.mapala.net/2')
      .addPlugin(RavenVue, Vue)
      .install()
}
