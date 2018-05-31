<template lang="pug">
.container.mt-4
  .row
    .col-md-8
      feed
    .col-4.d-none.d-md-block.bg-light.left-menu
      .row.mb-3
        .col
          el-dropdown(text="Menu")
            a.nav-item.nav-link Что такое Mapala? FAQ
              i.el-icon-arrow-down.el-icon--right
            el-dropdown-menu(slot="dropdown")
              el-dropdown-item Mapala
              el-dropdown-item Golos.io
              el-dropdown-item Блокчейн

      .row
        .col
          .card.bg-dark.text-white.text-center
            img(src='http://placehold.it/25x5', alt='').card-img
            .card-img-overlay
              a().btn.btn-sm.btn-outline-secondary Пройти задания
      .row
        .col
          .bg-light
            p Популярное




</template>

<script>
import Feed from '@/components/post/Feed'
import MapalaMap from '@/components/MapalaMap'


export default {
  async asyncData ({ store, commit }) {
    // undefined - для основной ленты
    store.commit('posts/set_author', undefined)
  },

  components: {
    //MapalaMap,
    Feed,
  }
}

</script>

<style scoped>
#map {
  top: 78px;
  position: sticky;
  height: calc(100vh - 92px);
}
.left-menu {
  top: 85px;
  position: sticky;
  height: calc(100vh - 116px);
}
</style>
