<template lang="pug">
.row
  .col(v-loading="loading").loading
    post(v-if="post" :post="post")
    not-found(v-if="notFound").mt-5

    // TODO Сделать стрелки
    //a(v-if="true" class="next_post") sadf
    //a(v-if="true" class="prev_post") adf
</template>

<script>
import { mapActions } from 'vuex'
import Post from '~/components/post/Post.vue'
import NotFound from '~/components/errors/NotFound.vue'
import { getContent } from '~/utils/golos'

export default {
  props: ['author', 'permlink'],

  components: {
    Post,
    NotFound
  },

  data () {
    return {
      loading: false,
      notFound: false,

      post: null
    }
  },

  watch: {
    $route (to, from){
      // Закрываем модалку когда уходим куда то
      this.$emit('close')
    }
  }, 

  async created() {
    this.loading = true
    this.post = await getContent(this.author.toLowerCase(), this.permlink)
    if (!this.post) this.notFound = true

    this.loading = false
  }
}
</script>

<style>
.loading {
  min-height: 300px;
}

  .prev_post {
    width: 70px;
    height: 70px;
    position: fixed;
    top: 48%;
    left: calc((100% - 866px)/2 - 130px);
    z-index: 102;
    /* background: url('~/assets/icon-prev.svg') no-repeat; */
    cursor: pointer;
  }

  .next_post {
    /* background: url('~/assets/icon-prev.svg') no-repeat; */
    transform: rotateZ(180deg);
    width: 70px;
    height: 70px;
    position: fixed;
    cursor: pointer;
    z-index: 102;
    top: 48%;
    right: calc((100% - 866px)/2 - 130px);
  }
</style>
