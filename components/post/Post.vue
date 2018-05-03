<template lang="pug">
.row
  .container
    h1 {{ post.title }}
    div(v-html="post.body").htm-from-blockchain

    .row
    button(type="button" @click="$router.go(-1)").btn.btn-light.btn-lg.btn-block.fixed-bottom Назад
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
    },
  },

  computed: {
    ...mapState({
      post: state => state.posts.post
    })
  },

  async asyncData ({ store, route }) {
    let wait = store.dispatch('posts/fetch_post', route.params)

    if (process.server) {
      await wait
    }
  },
}

</script>
