import golos from 'golos-js'
import slugify from 'slugify'

import config from '@/config'
import { get_account, prepare_json_metadata } from '@/utils/golos'

// TODO Когда выйдет vue 2.6 поменять на Proxy
// Если автора нет, то значение будет undefined
const authors = {}


export const state = () => ({
  author: {
    name: ''
  }
})

export const actions = {
  async set_author({ commit, dispatch, state }, author) {
    if (author in authors) {
      commit('set_author', authors[author])
    } else {
      authors[author] = await get_account(author)
      commit('set_author', authors[author])
    }
    console.log(authors[author])
  },
}

export const mutations = {
  set_author: (state, author) => {
    state.author = author
    author.json_metadata = JSON.parse(author.json_metadata)
  }
}
