<template lang="pug">
  div.comment.mt-2
    nuxt-link(:to="{name: 'account', params: {account: comment.author.name}}").user_av
      img(v-if="comment.author.meta.profile.profileImage" :src="comment.author.meta.profile.profileImage | golos_proxy('120x120')")

    div.comment_body
      div.name_bl
        nuxt-link.user_page(:to="{name: 'account', params: {account: comment.author.name}}")
          | {{ comment.author.name }}

        span.pr(v-show="comment.parentAuthor")
          | Отвелил {{ comment.parentAuthor }}

        div.date
          | {{ comment.created | formatDate }}

      div {{ comment.body }}

    comment-item(v-for="child in childComments" :comment="child" :comments="comments" :key="comment.id").nested

    //div.reply(v-if="isAuth", @click="reply(comment)")
      | {{ $t('reply') }}
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'comment-item',
  props: ['comment', 'comments'],

  data () {
    return {}
  },

  computed: {
    ...mapState({
      isAuth: state => state.user.auth.isAuth
    }),

    childComments() {
      //console.log(this.comments.filter(c => c.parentPermlink == this.comment.permlink))
      return this.comments.filter(c => c.parentPermlink == this.comment.permlink)
    }
  },

  methods: {
    reply (comment) {
      this.$emit('reply', comment)
    }
  },
}
</script>

<style lang="stylus" scoped>
  .nested
    margin-left: 50px

  .comments_block .comment{
    display: flex;
    flex-wrap: wrap;
  }

  .comments_block .comment .user_av{
    width: 40px;
    height: 40px;
    overflow: hidden;
    border-radius: 50%;
    display: inline-block;
    margin-right: 15px;
  }

  .comments_block .comment .user_av img{
    display: block;
    width: 100%;
  }

  .comments_block .comment .comment_body{
    width: calc(100% - 55px);
    font: 16px 'PT Sans';
    letter-spacing: -1px;
    color: #20262d;
    margin-bottom: 1px;
    word-break: break-word;
  }


  .comments_block .comment .comment_body iframe {
    max-width: 80%;
  }

  .comments_block .comment .comment_body img {
    max-width:100%;
  }

  .comments_block .comment .user_page{
    text-decoration: none;
    color: #6d9ee1;
    font-weight: 700;
    margin-right: 3px;
  }

  .comments_block .comment .pr{
    font: 16px 'PT Sans';
    letter-spacing: -0.5px;
    color: #a2a2a2;
    cursor: pointer;
  }

  .comments_block .comment .reply{
    margin-left: 55px;
    font: 700 14px 'PT Sans';
    letter-spacing: -0.4px;
    color: #5d7394;
    cursor: pointer;
  }
</style>
