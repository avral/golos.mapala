import Vue from 'vue'
import moment from 'moment'
import marked from 'marked'

import prepare_html from '@/utils/prepare_html'


Vue.filter('formatDate', (value) => {
  moment.locale('ru')

  return moment.utc(value.toString()).fromNow()
})

Vue.filter('golos_html', (value) => {
  let html = marked(value)

  return html
})


Vue.filter('body_preview', (value, length=50) => {
	let tmp = document.createElement("DIV");

	tmp.innerHTML = value;
  let text = tmp.textContent || tmp.innerText

	return text.slice(0, length);
})
