<template lang="pug">
.container.mt-4
  ol.breadcrumb
    li.breadcrumb-item
      a(href='index.html') Добавить публикацию

  .input-group
    input(v-model="editor.title", placeholder="title").form-control

  // Markdown
  div(v-show="editor.type == 'markdown'")
    button.btn.btn-secondary(@click="toggle_editor") HTML Редактор

    textarea.form-control(@input="update_body", rows="10", v-model="editor.markdown")
    br

  // HTML Редактор
  div(v-show="editor.type == 'html'")
    button.btn.btn-secondary(@click="toggle_editor") Markdown

    br
    br

    .quill-editor(v-quill:myQuillEditor="editorOptions", @input="update_body", v-model="editor.html")

    br
    
  input(v-model="editor.tags", placeholder="tags").form-control

  gmap-autocomplete(placeholder="Локация", :value="editor.location.name", @place_changed="setPlace")

  br
  button.btn.btn-secondary(@click="_submit") Отправить
  button.btn.btn-info.pull-right(@click="clear") Очистить

  br


  h3 Предпросмотр

  div(v-html="editor.body")

  // TODO Все ок, но разобраться почему там p

</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'


export default {
  middleware: 'auth',

  data() {
    return {
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
      editor: state => state.editor
    }),
  },

  methods: {
    ...mapMutations({
      clear: 'editor/clear',
      set_title: 'editor/set_title',
      update_body: 'editor/update_body',
      toggle_editor: 'editor/toggle',
    }),
    ...mapActions({
      submit: 'editor/submit',
    }),
    setPlace(place) {
      this.editor.location.name = place.formatted_address
      this.editor.location.lat = place.geometry.location.lat()
      this.editor.location.lng = place.geometry.location.lng()
    },

    async _submit() {
      try {
        await this.submit()
      } catch (e) {
        alert(e.message)
      }
    },
  }
}

</script>

<style>
</style>
