<template lang="pug">
.row
  .container
    post(:post="post")

    .row
      button(type="button" @click="$router.go(-1)").btn.btn-light.btn-lg.btn-block.fixed-bottom Назад

</template>

<script>
import Post from '~/components/post/Post.vue'
import { POST_QUERY } from '@/constants/queries.js'


export default {
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
