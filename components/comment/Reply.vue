<template lang="pug">
  div(v-if="$store.getters['auth/isAuth']",
      :class="{ comment_storing: isStoring }",
      class="write_comment_wrapper"
      v-loading="loading")

    div.write_comment
      div.ca_w
        img.user_av(:src="$store.state.auth.account.meta.profile.profileImage")

      div.write_w
        div.txt(
          @blur="stopEdit",
          contenteditable="true",
          ref="text"
        )
        div.placeholder(v-show="!isEdit", @click="startComment")
          | Добавить комментарий
    div.send-comment(@click="addComment")
      i.fa.fa-paper-plane-o(style="font-size:24px")

    //div.comment_for
      | Ответ {{ parentAuthor }}

      //span.cancel(v-show="comment.parentAuthor", @click="cancelReply")
        | X
</template>

<script>
import { mapState } from 'vuex'
import golos from 'golos-js'

export default {
  props: ['parentAuthor', 'parentPermlink'],

  data () {
    return {
      isEdit: false,

      comment: {
        body: '',
        author: '',
        parentAuthor: '',
        parentPermlink: ''
      },

      isStoring: false,
      loading: false
    }
  },

  computed: {
    ...mapState({
      auth: state => state.auth
    })
  },

  methods: {
    addComment () {
      let body = this.$refs.text.innerText
      if (!body) return this.$message.warning('Добавьте текст комментария')

      this.loading = true

      golos.broadcast.comment(
        this.auth.wif,
        this.parentAuthor,
        this.parentPermlink,
        this.auth.account.name,
        golos.formatter.commentPermlink(this.parentAuthor, this.parentPermlink),
        '',
        body,
        {},
        (err, res) => {
          if (err) {
            console.log(err)
            this.$notify.error(err.message)
            this.loading = false
          } else {
            this.$emit('newComment', res.operations[0][1])
            this.endEdit()
            this.loading = false
          }
        }
      )
    },

    changeText (value) {
      this.$emit('input', value)
    },

    stopEdit() {
      if(this.$refs.text.innerText.length == 0)
        this.endEdit()
    },
    startComment () {
      this.isEdit = true
      this.$refs.text.focus()
    },
    endEdit () {
      this.$refs.text.innerText = ''
      this.$refs.text.blur()
      this.isEdit = false

      this.new_comment = {
        body: '',
        author: '',
        parentAuthor: '',
        parentPermlink: '',
      }
    }
  },
}
</script>

<style lang="stylus" scoped>
.send-comment {
  padding: 0px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

  .comment_for{
    font: 16px 'PT Sans';
    letter-spacing: -0.5px;
    color: #a2a2a2;
    text-align: right;
    margin-top: 10px;
  }

  .comment_for .cancel{
    cursor: pointer;
    width: 20px;
    display: inline-block;
    text-align: center;
  }

  .write_comment{
    border-radius: 6px;
    background-color: #ffffff;
    min-height: 52px;
    position: relative;
    padding-top: 1px;
    display: flex;
    width: 100%;
  }

  .write_comment .write_w{
    min-height: 52px;
    max-width: calc(100% - 52px);
    width: 100%;
    position: relative;
  }

  .write_comment .placeholder{
    font: 14px/52px 'PT Sans';
    letter-spacing: -0.4px;
    color: rgba(72, 84, 101, 0.7);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    cursor: text;
  }

  .write_comment .txt{
    font: 14px 'PT Sans';
    letter-spacing: -0.4px;
    color: #000;
    min-height: 52px;
    padding: 17px 15px 17px 0;
    box-sizing: border-box;
    outline: 0;
    width: 100%;
    word-wrap: break-word;
  }

  .write_comment .ca_w{
    width: 45px;
    height: 38px;
    margin: 10px;
    overflow: hidden;
    border-radius: 50%;
  }

  .write_comment_wrapper {
    display: flex;
  }

  .comment_storing {
    background: rgba(0,0,0,0.1);
    opacity: 0.4;
  }
</style>
