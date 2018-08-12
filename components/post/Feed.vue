<template lang="pug">
// FIXME При возвращении на ленту, не сохраняется место скрола
// TODO В ленту подгружать не полные посты полный пост только в модалке или странице
// Скорее всего решится proxy в 1.6 vue
div
  post-item(v-for="post in posts", :post="post", :key="post.id")

  no-ssr
    infinite-loading(@infinite="handleLoading", :distance="200", force-use-infinite-wrapper="true")
      p(slot="no-more") Больше нет постов :(
</template>

<script>
import config from '~/config'
import { mapState, mapActions } from 'vuex'

import PostItem from '@/components/post/PostItem'
import { POSTS_QUERY } from '@/constants/queries.js'


export default {
  props: {
    filters: {
      default() {
        return {}
      }
    }
  },

  data() {
    return {
      posts: [],

      // pagination
      after: undefined
    }
  },

  //watch: {
  //  filters: {
  //    handler(val) {
  //      console.log(val, 'filters changed')
  //    },
  //    deep: true
  //  }
  //},

  //computed: { 
  //  ...mapState({
  //    isLoading: state => state.isLoading,
  //    posts: state => state.posts.list
  //  }),
  //},

  created() {
    this.fetch_posts()
  },

  methods: {
    async fetch_posts() {
      let client = this.$apolloProvider.defaultClient

      let { data } = await client.query({query: POSTS_QUERY, variables: {
        category: config.tag_for_post,
        first: 10, // FIXME
        author: this.filters.author,
        after: this.after
      }})

      let posts = data.posts.edges.map(p => p.node)
      let posts_deep_copy = JSON.parse(JSON.stringify(posts))

      this.posts = this.posts.concat(posts_deep_copy)

      if (posts.length > 0) {
        this.after = data.posts.edges[data.posts.edges.length - 1].cursor
      }
    },

    handleLoading($state) {
      const posts_count = this.posts.length

      this.fetch_posts().then(() => {
        if (posts_count == this.posts.length) {
          $state.complete()
        } else {
          $state.loaded()
        }
      }).catch(e => {
        console.log('Request error', e)

        setTimeout(() => $state.loaded(), 1000)
      })
    }
  },

  components: {
    PostItem
  }
}

</script>
