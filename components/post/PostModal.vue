<template lang="pug">
.row
  .col
    post(:post="postProp", v-loading="loading")

    // TODO Сделать стрелки
    //a(v-if="true" class="next_post") sadf
    //a(v-if="true" class="prev_post") adf
</template>

<script>
import { mapActions } from 'vuex'
import Post from '~/components/post/Post.vue'

export default {
  props: ['post', 'update'],

  components: {
    Post
  },

  data () {
    return {
      postProp: undefined,
      loading: false
    }
  },

  methods: {
    ...mapActions({
      'fetch_post': 'posts/fetch_post'
    })
  },

  async created() {
    // TODO Разоброться как тут поступать
    if (this.update) {
      this.loading = true

      this.postProp = await this.fetch_post({author: this.post.author, permlink: this.post.permlink})
      console.log(this.post)
      this.loading = false
    } else {
      this.postProp = this.post
    }
  }
}
</script>

<style>
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
