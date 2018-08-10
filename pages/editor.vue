<template lang="pug">
.container.mt-4
  el-tabs(type="border-card")
    el-tab-pane(label="Редактор")
      .row
        .col-8
          .input-group
            .input-group-prepend
              .input-group-text Заголовок
            input(v-model="editor.title", placeholder="title").form-control

        .col-4.d-flex.flex-row-reverse
          div(v-show="editor.type == 'markdown'")
            button.btn.btn-secondary(@click="toggle_editor") HTML Редактор

          div(v-show="editor.type == 'html'")
            button.btn.btn-secondary(@click="toggle_editor") Markdown

          button.btn.btn-info(@click="clear").mr-auto Очистить

      .row.mt-3
        .col
          div(v-show="editor.type == 'markdown'")
            textarea.form-control(
              @input="update_body", rows="10",
              v-model="editor.markdown"
            )

          div(v-show="editor.type == 'html'")
            .quill-editor(
              v-quill:myQuillEditor="editorOptions",
              @input="update_body", v-model="editor.html"
            )

      .row.mt-2
        .col
          .input-group
            .input-group-prepend
              .input-group-text Локация
            gmap-autocomplete(:value="editor.location.name", @place_changed="setPlace").form-control

      .row.mt-3
        .col
          el-tag(:key="index"
                  v-for="(tag, index) in editor.tags"
                  :closable="index != 0"
                  :disable-transitions="false"
                  @close="handleClose(tag)") {{ tag }}

          el-input(class="input-new-tag"
                    v-if="inputVisible"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="mini"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm")

          el-button(v-else-if="editor.tags.length < 5" class="button-new-tag" size="small" @click="showInput") + Добавить тег

      .row.mt-3
        .col
          el-button(type="primary" @click="_submit", :loading="loading") Отправить
    
    el-tab-pane(label="Предпросмотр")
      h1 {{ editor.title }}

      div(v-html="preview")

</template>

<script>
// FIXME Огромные картинки не влезают в превью
// FIXME Запятые и точки не проходят в заголовке
import { mapState, mapActions, mapMutations } from 'vuex'


export default {
  layout: 'full-width',
  middleware: 'auth',

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
    }),

    preview() {
      if (this.editor.type == 'markdown') {
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
