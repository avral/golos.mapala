<template lang="pug">
.container.mt-4
  .row
    .col-md-8
      feed
    // .col-4.d-none.d-md-block.bg-light.left-menu
    .col-4.d-none.d-md-block.left-menu
      .row.mb-3
        .col
          el-menu(default-active="2"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          )
            el-submenu(index="1")
              template(slot="title")
                i.el-icon-question
                span Что такое Mapala?

              //el-menu-item-group(title="Group One")
              el-menu-item(index="1-1") Mapala
              el-menu-item(index="1-2") Golos.io
              el-menu-item(index="1-3") Блокчейн

      .row
        .col
          .card.bg-dark.text-white.text-center
            img(src='http://placehold.it/25x5', alt='').card-img
            .card-img-overlay
              a().btn.btn-sm.btn-outline-secondary Пройти задания
      //.row
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
