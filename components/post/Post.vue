<template lang="pug">
.row
  .container
    h1 {{ post.title }}
    div(v-html="body").htm-from-blockchain

    .row
    button(type="button" @click="$router.go(-1)").btn.btn-light.btn-lg.btn-block.fixed-bottom Назад
</template>

<script>
import { mapState, mapActions } from 'vuex'
import marked from 'marked'
import xmldom from 'xmldom'
import prepare_html from '@/utils/prepare_html'


export default {
  methods: {
    ...mapActions({
      fetch_post: 'posts/fetch_post'
    }),
  },

  computed: {
    ...mapState({
      post: state => state.posts.post
    }),

    body() {
      if (this.post.jsonMetadata.format == 'markdown') {
        return this.$options.filters.markdown(this.post.body)
      } else {
        return this.$options.filters.golos_html(this.post.body)
      }
    }
  },

  async asyncData ({ store, route, error }) {
    try {
      let wait = await store.dispatch('posts/fetch_post', route.params)
    } catch (e) {
      error({stausCode: 404, message: 'Пост не найден'})
    }
  },

	head () {
    let desc = this.$options.filters.html_preview(this.post.body)
    let title = `${this.post.title} | Mapala`

		return {
			title: title,

			meta: [
				{
					hid: 'description',
					name: 'description',
					content: desc
				},
				{ property: 'og:title', content: title },
				{ property: 'og:type', content: 'article' },
				{ property: 'og:image', content: this.post.thumb },
				{ property: 'og:description', content: desc },


			],
			bodyAttrs: {
				class: 'overflowHidden'
			}
		}
	},
}


</script>
