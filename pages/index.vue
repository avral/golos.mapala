<template lang="pug">
.container-fluid.mt-3
  .row
    .col-12.col-md-4
      post-item(v-for="post in posts", :post="post", :key="post.id")

      .row
        .col
          no-ssr
            infinite-loading(@infinite="handleLoading", :distance="200", force-use-infinite-wrapper="true")
              p(slot="no-more") Больше нет постов :(

</template>

<script>
import { mapState, mapActions } from 'vuex'

import PostItem from '@/components/post/PostItem'
import MapalaMap from '@/components/MapalaMap'


export default {
  computed: { 
    ...mapState({
      isLoading: state => state.isLoading,
      posts: state => state.posts.list
    }),
  },

  methods: {
    ...mapActions({
      fetch_posts: 'posts/fetch_posts'
    }),

    handleLoading($state) {
      const posts_count = this.posts.length

      this.fetch_posts().then(() => {
        if (posts_count == this.posts.length) {
          $state.complete()
        } else {
          $state.loaded()
        }
      })
    }
  },

  components: {
    PostItem,
    MapalaMap,
  }
}

</script>

<style scoped>
#map {
  max-width: calc(100% - 574px);
  width: 100%;
  border-radius: 6px;
  -webkit-box-shadow: 0 0 10px 0 rgba(0,0,0,.1);
  box-shadow: 0 0 10px 0 rgba(0,0,0,.1);
  height: calc(100vh - 92px);
  position: fixed;
  top: 72px;
  right: 30px;
  z-index: 10;
  overflow: hidden;
}
</style>
