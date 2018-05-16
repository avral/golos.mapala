<template lang="pug">
.container.mt-3
  b-carousel(:interval="interval" v-model="slide" style="text-shadow: 1px 1px 2px #333;" img-height=50)
    b-carousel-slide(img-src="https://placehold.it/900x200" img-height=50)
      h1 Mapala
      p.lead несколько строк о проекте, вся суть

    b-carousel-slide(caption="Blank Image" img-blank img-alt="Blank image")
      p asdf


</template>

<script>
import { mapState, mapActions } from 'vuex'

import PostItem from '@/components/post/PostItem'
import MapalaMap from '@/components/MapalaMap'


export default {
  data() {
    return {
      slide: 0,
      sliding: null,
      interval: 0
    }
  },
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
