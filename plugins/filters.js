import Vue from 'vue'
import moment from 'moment'
import marked from 'marked'
import sbd from 'sbd'

import config from '~/config'

import prepare_html from '@/utils/prepare_html'


Vue.filter('html_preview', (value) => {
  return sbd.sentences(value, {sanitize: true }).slice(0, 2).join(' ')
})


Vue.filter('formatDate', (value) => {
  moment.locale('ru')

  return moment.utc(value.toString()).fromNow()
})

Vue.filter('markdown', (value) => {
  const body = value.replace(
    /(https?:\S*?\.(?:png|jpe?g|gif)(?:\?[^"']+?)?(?=<|\s))/igm,
    '![]($1)'
  )

  return marked(body)
})

Vue.filter('golos_html', (value) => {
  return prepare_html(value).html
})

Vue.filter('golos_proxy', (value, size) => {
  return `${config.img_proxy_prefix}${size}/${value}`
})


Vue.filter('body_preview', (value, length=50) => {
	let tmp = document.createElement("DIV");

	tmp.innerHTML = value;
  let text = tmp.textContent || tmp.innerText

	return text.slice(0, length);
})
