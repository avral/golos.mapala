<template lang="pug">
  .row.flex-xl-nowrap
    .col.left-menu
      ul.nav.flex-column
        li.nav-item
          a.nav-link.active О мапала
        li.nav-item
          a.nav-link.active Карта
    .col-6.mt-3
      feed
    .col

</template>

<script>
import Feed from '@/components/post/Feed'

export default {
  async asyncData ({ store, commit }) {
    // undefined - для основной ленты
    store.commit('posts/set_author', undefined)
  },

  components: {
    Feed
  }
}

</script>

<style>
.left-menu {
  top: 61px;
  position: sticky;
  height: calc(100vh - 61px);
}
</style>
