import marked from 'marked'

import config from '~/config'
import prepare_html from '~/utils/prepare_html'
import prepare_json_metadata from '~/utils/golos'



export const state = () => ({
  type: 'markdown',
  markdown: '',
  html: '',
  title: '',
  body: '',
  tags: [config.tag_for_post],
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
  set_type: (state, type) => state.type = type,

  update_body (state) {
    state.body = state[state.type]
  },

  clear(state) {
    state.title = ''
    state.body = ''
    state[state.type] = ''
    state.tags = [config.tag_for_post]

    // GeoJOSON standart
    state.location = {
      name: '',
      geometry: {
        type: 'Point',
        coordinates: ['', '']
      }
    }
  },
}

export const actions = {
  toggle({ state, commit }) {
    commit('set_type', state.type == 'markdown' ? 'html' : 'markdown')
    commit('update_body')
  },

  async submit({ state, commit, dispatch, rootState }) {
    let post = {
      title: state.title,
      body: state.body,
      meta: {
        tags: state.tags,
        location: state.location,
        format: state.type
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
