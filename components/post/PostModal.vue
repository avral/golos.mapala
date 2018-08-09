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
import { POST_QUERY } from '@/constants/queries.js'

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

  watch: {
    $route (to, from){
      // Закрываем модалку когда уходим куда то
      this.$emit('close')
    }
  }, 

  methods: {
    ...mapActions({
      'fetch_post': 'posts/fetch_post'
    })
  },

  async created() {
    console.log(this.post)
    // TODO Разоброться как тут поступать
    if (this.update) {
      this.loading = true

      let client = this.$apolloProvider.defaultClient

      let {data: {post}} = await client.query({query: POST_QUERY, variables: {
        identifier: `@${this.post.author.toLowerCase()}/${this.post.permlink}`
      }})

      this.postProp = post
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
