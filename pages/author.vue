<template lang="pug">
div
  ol.breadcrumb
    li.breadcrumb-item
      a(href='index.html') Dashboard
    li.breadcrumb-item.active Blank Page

  // лента
  feed

</template>

<script>
import Feed from '@/components/post/Feed'

export default {
  async asyncData ({ store, route }) {
    store.commit('posts/SET_AUTHOR', route.params.author)
  },

  components: {
    Feed
  }
}

</script>

<style>
.lol {
  height: 100%;
}
</style>
