import marked from 'marked'
import slug from 'slug'

import golos from 'golos-js'
import config from '~/config'
import { prepare_json_metadata } from '~/utils/golos'


export const state = () => ({
  // TODO тип выплат

  format: 'markdown',
  markdown: '',
  html: '',
  title: '',
  permlink: null,
  body: '',
  tags: [config.tag_for_post],
  location: {
    name: '',
    geometry: {
      format: 'Point',
      coordinates: ['', '']
    },
  }
})

export const mutations = {
  set_title: (state, title) => state.title = title,
  set_tag: (state, tag) => state.tags.push(tag),
  set_format: (state, format) => state.format = format,

  update_body (state) {
    state.body = state[state.format]
  },

  clear(state) {
    state.title = ''
    state.body = ''
    state[state.format] = ''
    state.tags = [config.tag_for_post]
    state.permlink = null

    // GeoJOSON standart
    state.location = {
      name: '',
      geometry: {
        format: 'Point',
        coordinates: ['', '']
      }
    }
  },
}

export const actions = {
  toggle({ state, commit }) {
    commit('set_format', state.format == 'markdown' ? 'html' : 'markdown')
    commit('update_body')
  },

  async submit({ state, commit, dispatch, rootState }) {
    if (!rootState.auth.wif && !rootState.auth.account.name) {
      throw new Error('Добавьте постинг ключ или имя пользователя')
    }

    return new Promise((resolve, reject) => {
      golos.broadcast.comment(
        rootState.auth.wif,
        '',
        config.tag_for_post,
        rootState.auth.account.name,
        state.permlink || slug(state.title, {lower: true}),
        state.title,
        state.body,
        prepare_json_metadata({
          tags: state.tags,
          location: state.location,
          format: state.format
        }), (err, res) => {
          if (err) {
            reject(err.message)
          } else {
            commit('clear')
            resolve(res)
          }
        }
      )
    })
  }
}
