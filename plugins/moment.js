import Vue from 'vue'
import moment from 'moment'

Vue.filter('formatDate', (value) => {
  moment.locale('ru')

  return moment.utc(value.toString()).fromNow()
})
