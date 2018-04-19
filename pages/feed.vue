<template lang="pug">
div
  ol.breadcrumb
    li.breadcrumb-item
      a(href='index.html') Dashboard
    li.breadcrumb-item.active Blank Page

  .row
    //.col
    .col-5
      post-item(v-for="post in posts", :post="post", :key="post.id")

      .row
        .col-12
          p
          no-ssr
            infinite-loading(@infinite="handleLoading", :distance="200", force-use-infinite-wrapper="true")

</template>

<script>
import golos from 'golos-js'

import { mapState, mapActions } from 'vuex'

import PostItem from '@/components/post/PostItem'


export default {
  async asyncData ({ store}) {
    // console.log(process)
  },

  methods: {
    ...mapActions({
      fetch_posts: 'posts/fetch_posts'
    }),

    handleLoading($state) {
      console.log(1111)
      this.fetch_posts().then(() => $state.loaded())
      
      //if (this.isLoading) {
      //  $state.complete()
      //} else {
      //  this.fetch_posts().then($state.loaded())
      //}
    }
  },

  computed: { 
    ...mapState({
      posts: state => state.posts.list,
      isLoading: state => state.isLoading,
    }),
  },

  components: {
    PostItem
  }
}

</script>

<style>
.lol {
  height: 100%;
}
</style>
