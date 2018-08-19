<template lang="pug">
.row
  .col-md-4
    no-ssr
      create-post-button(v-if="$store.state.auth.isAuth")
    feed
  .col.right-fixed-container(v-if="$device.isDesktop")
    no-ssr
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
