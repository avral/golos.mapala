<template lang="pug">
div
  div(v-html="html").content
  //.content {{ html }}

</template>

<script>
import marked from 'marked'
import { XmlEntities } from 'html-entities'


const entities = new XmlEntities()

// TODO Доработать регулярку
const image_regex = /((?<!["\(\/])https?:\/\/(?:[\da-zA-Z]{1}(?:[\w\-\.]+\.)+(?:[\w]{2,5}))(?:\:[\d]{1,5})?\/(?:[^\s\/]+\/).*?\.(?:jpe?g|gif|png)(?:\?\w+=\w+(?:\&\w+=\w+)*)?)/igm

export default {
  props: ['body', 'format'],

  computed: {
    html() {
      let html
      if (this.format == 'markdown') {
        html = marked(this.body.replace(image_regex, '![](https://imgp.golos.io/0x0/$1)'))
      } else {
        html = entities.decode(this.body)
        html = html.replace(image_regex, '<img src="https://imgp.golos.io/0x0/$1"></img>')
      }

      return html
    }
  }
}
</script>

<style>
.content {
  color: #141823;
  overflow: hidden;
	padding: 0px 20px;
  letter-spacing: -1px;
  word-wrap: break-word;
  font: 21px/1.52 'PT Sans';
  -ms-word-wrap: break-word;
}

.content img {
  max-width: 100%;
  text-align: center;
  margin: 24px auto;
	padding: 0px 0px;
}
</style>
