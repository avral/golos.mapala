<template lang="pug">
  .row
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
  methods: {
    ...mapActions({
      fetch_posts: 'posts/fetch_posts'
    }),

    handleLoading($state) {
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
