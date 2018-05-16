import golos from 'golos-js'
import slugify from 'slugify'

import config from '@/config'
import { prepare_json_metadata } from '@/utils/golos'


export const state = () => ({
  wss: 'wss://ws17.golos.io',
  tag_for_post: null, // Default
})

export const actions = {
  async init({ state, commit }) {
    commit('SET_NODE', state.wss)

    state.tag_for_post = this.app.context.isDev ? 'test' : config.app_tags[0]
  },

  vote({ state, commit, rootState }, { author, permlink }) {
    if (!rootState.account.wif && !rootState.account.name) {
      // TODO через геттеры isAuth
      throw new Error('Добавьте постинг ключ или имя пользователя')
    }

    return new Promise((_, reject) => {
      golos.broadcast.vote(rootState.account.wif, rootState.account.name, author, permlink, 10000, function (err, res) {
        if (err) reject(err.message)
      })
    })

  },

  post({ state, commit, rootState }, { title, body, meta }) {
    if (!rootState.account.wif && !rootState.account.name) {
      throw new Error('Добавьте постинг ключ или имя пользователя')
    }

    return new Promise((resolve) => {
      golos.broadcast.comment(
      //console.log(
        rootState.account.wif,
        '',
        state.tag_for_post,
        rootState.account.name,
        slugify(title, {lower: true}),
        title,
        body,
        prepare_json_metadata(state.tag_for_post, meta),

        (err, res) => resolve({err, res})
      )
    })
  }
}

export const mutations = {
  SET_NODE(state, node) {
    state.wss = node
    golos.config.set('websocket', state.wss)
  }
}
