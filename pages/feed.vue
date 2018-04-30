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
  async asyncData ({ store, commit }) {
    // undefined - для основной ленты
    store.commit('posts/SET_AUTHOR', undefined)
    store.commit('posts/SET_FETCH_METHOD', 'created')
  },

  components: {
    Feed
  }
}

</script>
