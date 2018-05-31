import golos from 'golos-js'
import slugify from 'slugify'

import config from '@/config'
import { prepare_json_metadata } from '@/utils/golos'


export const state = () => ({
  wss: 'wss://ws17.golos.io',
})

export const actions = {
  async init({ state, commit }) {
    commit('SET_NODE', state.wss)
  },

  vote({ state, commit, rootState }, { author, permlink }) {
    if (!rootState.account.wif && !rootState.account.name) {
      // TODO через геттеры isAuth
      throw new Error('Добавьте постинг ключ или имя пользователя')
    }

    return new Promise((resolve, reject) => {
      golos.broadcast.vote(rootState.account.wif, rootState.account.name, author, permlink, 10000, function (err, res) {
				err ? reject(err) : resolve(res)
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
        config.tag_for_post,
        rootState.account.name,
        slugify(title, {lower: true}),
        title,
        body,
        prepare_json_metadata(meta),

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
