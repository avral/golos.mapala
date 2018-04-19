<template lang="pug">
div
  button(@click="test")
  ol.breadcrumb
    li.breadcrumb-item
      a(href='index.html') Dashboard
    li.breadcrumb-item.active Blank Page
  .row
    .col-12
      h1 {{ post.title }}
      div(v-html="post.body").htm-from-blockchain
  // /.container-fluid
  // /.content-wrapper
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions({
      fetch_post: 'posts/fetch_post'
    }),
    test() {
      console.log(this.post)
    }
  },

  computed: {
    ...mapState({
      post: state => state.posts.post
    })
  },

  async asyncData ({ store, route}) {
    let wait = store.dispatch('posts/fetch_post', route.params)

    if (process.server) {
      await wait
    }
  },
}

</script>
