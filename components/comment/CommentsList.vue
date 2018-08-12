<template lang="pug">

  div
    //div.show_more_comments_button(v-if="hasPostMoreComments", @click="fetchAllComments()")
      | {{ $t('show_comments') }}

    comments-item(v-for="comment of rootComments", :comment="comment", :comments="post.comments" :key="comment.id", @reply="reply")

</template>

<script>
import CommentsItem from '~/components/comment/CommentItem.vue'

export default {
  props: ['post'],

  computed: {
    rootComments() {
      return this.post.comments.filter(c => c.parentPermlink == this.post.permlink)
    },
  },
  methods: {
    reply (comment) {
      this.$emit('reply', comment)
    }
  },

  components: {
    CommentsItem
  }
}
</script>

<style lang="stylus" scoped>
  .show_more_comments_button
    display: block
    width: 100%
    text-decoration: none
    text-align: center
    font: 700 14px/40px 'PT Sans'
    letter-spacing: -0.3px
    color: #5d7394
    border-radius: 6px
    background-color: #e3e8ef
    margin-bottom: 20px
    cursor: pointer
    user-select: none
</style>
