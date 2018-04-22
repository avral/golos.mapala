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
import { mapState, mapActions } from 'vuex'

import PostItem from '@/components/post/PostItem'


export default {
  data() {
    return {
      author: ''
    }
  },
  async asyncData ({ store, route }) {
    store.commit('posts/SET_AUTHOR', route.params.author)
  },

  methods: {
    ...mapActions({
      fetch_posts: 'posts/fetch_posts'
    }),

    handleLoading($state) {
      // TODO вынести в одно место
      this.fetch_posts().then(() => $state.loaded())
    }
  },

  computed: { 
    ...mapState({
      isLoading: state => state.isLoading,
      posts: state => state.posts.list
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
