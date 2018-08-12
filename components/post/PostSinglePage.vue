<template lang="pug">
.row
  .container
    post(:post="post")

</template>

<script>
import Post from '~/components/post/Post.vue'
import { POST_QUERY } from '@/constants/queries.js'


export default {
  scrollToTop: true,
  layout: 'full-width',

  components: {
    Post
  },

  async asyncData ({ store, route, error, app }) {
    let client = app.apolloProvider.defaultClient

    let { author, permlink } = route.params

    let {data: {post}} = await client.query({query: POST_QUERY, variables: {
      identifier: `@${author}/${permlink}`
    }})

    return { post }
  }
}

</script>
