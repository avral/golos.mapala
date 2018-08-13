<template lang="pug">
.container.mt-4
  no-ssr
    el-tabs(type="border-card")
      el-tab-pane(label="Редактор")
        editor

      el-tab-pane(label="Предпросмотр")
        preview

</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { MINIMAL_POST_QUERY } from '@/constants/queries.js'

import Editor from '~/components/editor/Editor.vue'
import Preview from '~/components/editor/Preview.vue'

export default {
  layout: 'full-width',
  //middleware: 'auth',

  components: {
    Editor,
    Preview
  },

  async created() {
    if(!this.$store.getters['auth/isAuth']) {
      this.$router.push('login')
    }

    let editor = this.editor
    let permlink = this.$route.params.permlink

    if (permlink) {
      // Если это редактирование поста
      let client = this.$apolloProvider.defaultClient

      let {data: {post}} = await client.query({query: MINIMAL_POST_QUERY, variables: {
        identifier: `@${this.account.name}/${permlink}`,
        authorized: !!this.$store.state.auth.wif
      }})

      editor.format = post.meta.format || 'html'
      this.$store.commit('editor/clear')

      editor.permlink = permlink

      editor.title = post.title
      editor[editor.format] = post.body
      editor.tags = [...new Set([editor.tags[0], ...post.meta.tags])]

      this.$store.commit('editor/update_body')
    } else {
      // Создание нового поста
      this.$store.commit('editor/clear')
      editor.permlink = null
    }
  },

  data() {
    return {
      loading: false,

      inputVisible: false,
      inputValue: '',

      editorOptions: {
        theme: 'snow',
        placeholder: 'Заголовок',
        bounds: '#write_text',
        modules: {
          toolbar: {
            container: [['bold', 'italic'], [{ 'header': 1 }, { 'header': 2 }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }], [{ 'align': [] }],
              [{ 'script': 'sub' }, { 'script': 'super' }], ['link'], ['video'],
              ['image'], ['blockquote'], ['clean']],
            handlers: {
              // TODO Загрузка картинок в голос
              image: this.imageHandler
            }
          },
          clipboard: {
            matchVisual: false
          }
        }
      },
      image_loading: false,
    }
  },
  computed: {
    ...mapState({
      editor: state => state.editor,
      account: state => state.auth.account
    }),

    preview() {
      if (this.editor.format == 'markdown') {
        return this.$options.filters.markdown(this.editor.body)
      } else {
        return this.$options.filters.golos_html(this.editor.body)
      }
    }
  },

  methods: {
    ...mapMutations({
      clear: 'editor/clear',
      set_title: 'editor/set_title',
      update_body: 'editor/update_body',
    }),

    ...mapActions({
      submit: 'editor/submit',
      toggle_editor: 'editor/toggle',
    }),

    handleClose(tag) {
      this.editor.tags.splice(this.editor.tags.indexOf(tag), 1)
    },

    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm() {
      let inputValue = this.inputValue
      if (inputValue) {
        this.editor.tags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },

    setPlace(place) {
      this.editor.location.name = place.formatted_address
      this.editor.location.geometry.coordinates = [
        place.geometry.location.lat(),
        place.geometry.location.lng()
      ]
    },

    async _submit() {
      if (!this.editor.title) return this.$message.warning('Добавьте заголовок')
      if (!this.editor.body) return this.$message.warning('Добавьте текст публикации')
      if (!this.editor.location.name) return this.$message.warning('Локация обязательна')

      this.loading = true

      try {
        await this.submit()

        this.$alert('Ваш пост появится в ленте через несколько минут', 'Опубликованно', {
          confirmButtonText: 'OK',
          callback: () => this.$router.push({ name: 'index'})
        })
      } catch (e) {
          this.$notify.error({
            title: 'Error',
            message: JSON.stringify(e)
          })
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
