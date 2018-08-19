<template lang="pug">
div
  .row
    .col-8
      .input-group
        .input-group-prepend
          .input-group-text Заголовок
        input(v-model="editor.title", placeholder="title").form-control

    .col-4.d-flex.flex-row-reverse
      div(v-show="editor.format == 'markdown'")
        button.btn.btn-secondary(@click="toggle_editor") HTML Редактор

      div(v-show="editor.format == 'html'")
        button.btn.btn-secondary(@click="toggle_editor") Markdown

      button.btn.btn-info(@click="clear").mr-auto Очистить

  .row.mt-3
    .col
      div(v-show="editor.format == 'markdown'")
        textarea.form-control

      div(v-show="editor.format == 'html'")
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

</template>

<script>
// FIXME Где то баг може быть в clear прервыается после печатания первой буквы
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  layout: 'full-width',

  computed: {
    ...mapState({
      editor: state => state.editor,
      account: state => state.auth.account
    }),
  },

  async created() {
    var store = this.$store
    let SimpleMDE = await import('simplemde')
    var simplemde = new SimpleMDE({
      forceSync: true,
      autofocus: true,
      spellChecker: false,
      promptURLs: true,
      initialValue: this.editor.markdown,

      // TODO previewRender: 
	    //autosave: {
		  //  enabled: true,
      //  uniqueId: this.$route.params.permlink || 'default'
      //}
    })

    simplemde.codemirror.on("change", () => {
      this.editor.body = simplemde.value()
    })

		const oldEditorSetOption = simplemde.codemirror.setOption

		simplemde.codemirror.setOption = function(option, value) {
				oldEditorSetOption.apply(this, arguments);

				if (option === 'fullScreen') {
          store.dispatch('showTopToggle')
				}
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

  methods: {
    update_body() {
      console.log(this.$refs)
    },
    ...mapMutations({
      clear: 'editor/clear',
      set_title: 'editor/set_title',
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
  @import '~/node_modules/simplemde/dist/simplemde.min.css';

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
