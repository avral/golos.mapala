<template lang="pug">
.row
  .col-md-4
    create-post-button(v-if="$store.state.auth.isAuth")
    feed
  .col.right-fixed-container(v-if="$device.isDesktop")
    mapala-map#map
</template>

<script>
import Feed from '@/components/post/Feed'
import CreatePostButton from '@/components/post/CreatePostButton'
import MapalaMap from '@/components/MapalaMap'


export default {
  async fetch({ store }) {
    store.dispatch('posts/set_author', undefined)

    if (process.server) {
      await store.dispatch('posts/fetch_posts')
    }
  },

  components: {
    Feed,
    CreatePostButton,
    MapalaMap
  },
}

</script>

<style scoped>
#map {
  top: 78px;
  position: sticky;
  height: calc(100vh - 92px);

  border-radius: 6px;
  -webkit-box-shadow: 0 0 10px 0 rgba(0,0,0,.1);
  box-shadow: 0 0 10px 0 rgba(0,0,0,.1);
  z-index: 10;
  overflow: hidden;
}
.right-fixed-container {
  padding-left: 0px;
  top: 85px;
  position: sticky;
  height: calc(100vh - 116px);
}
</style>
