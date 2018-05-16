import marked from 'marked'

import prepare_html from '@/utils/prepare_html'
import prepare_json_metadata from '@/utils/golos'


export const state = () => ({
  type: 'markdown',
  markdown: '',
  html: '',
  title: '',
  tags: [],
  location: {
    name: '',
    geometry: {
      type: 'Point',
      coordinates: ['', '']
    },
  }
})

export const mutations = {
  set_title: (state, title) => state.title = title,
  set_tag: (state, tag) => state.tags.push(tag),

  update_body (state) {
    let html = prepare_html(state[state.type]).html

    state.body = state.type == 'markdown' ? marked(html) : html
  },

  clear(state) {
    state.title = ''
    state.body = ''
    state[state.type] = ''
    state.tags = []

    // GeoJOSON standart
    state.location = {
      name: '',
      geometry: {
        type: 'Point',
        coordinates: ['', '']
    }
  }

  },

  toggle: state => state.type = state.type == 'markdown' ? 'html' : 'markdown',
}

export const actions = {
  async submit({ state, commit, dispatch, rootState }) {
    let post = {
      title: state.title,
      body: state.body,
      meta: {
        tags: state.tags,
        location: state.location
      }
    }

    let { err,  res } = await dispatch('golos/post', post, { root: true })

    if (err) {
      throw Error(err.message)
    } else {
      return res
    }
  }
}
