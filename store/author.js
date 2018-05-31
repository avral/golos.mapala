import golos from 'golos-js'
import slugify from 'slugify'

import config from '@/config'
import { get_account, prepare_json_metadata } from '@/utils/golos'


export const state = () => ({
  author: {
    name: ''
  }
})

export const actions = {
  async set_author({ commit, dispatch, state }, author_name) {
    console.log(123)
    let author = await get_account(author_name)

    if (!author) throw new Error('Такого автора не существует')

    commit('set_author', author)
    commit('posts/set_author', author_name, {root: true})
  },
}

export const mutations = {
  set_author: (state, author) => {
    state.author = author
    author.json_metadata = JSON.parse(author.json_metadata)
  }
}
