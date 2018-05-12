<template lang="pug">
div
  p asdf {{ author.name }}
  div(v-if="author.name")
      p {{ author.name }}

      .row.justify-content-center
        feed.col-6

  div(v-else)
    p.lead.text-center Такого аккаунта не существует :(
    

</template>

<script>
import Feed from '@/components/post/Feed'
import { mapState } from 'vuex'

export default {
  async asyncData ({ store, route }) {
    store.commit('posts/SET_AUTHOR', route.params.author)

    let wait = store.dispatch('author/set_author', route.params.author)

    if (process.server) {
      await wait
    }
  },

  components: {
    Feed
  },

  computed: {
    ...mapState({
      'author': state => state.author.author
    })
  }
}

</script>

<style>
.lol {
  height: 100%;
}
</style>
