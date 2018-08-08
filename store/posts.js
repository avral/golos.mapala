import golos from 'golos-js'

import Vue from 'vue'

import config from '@/config'
import { get_account, posts_by_blog, posts_by_created } from '@/utils/golos'
import { POSTS_QUERY, POST_QUERY } from '@/constants/queries.js'


export const state = () => ({
  post: {},
  list: [], // current posts

  // query pagination
  author: undefined,
  after: undefined,

  tags: config.app_tags,

  limit: config.get_content_limit,
  isloading: false,
})

export const actions = {
	// TODO Сделать вывод ошибки если запрос не дошел
  async fetch_post ({ commit, state, rootState}, {author, permlink}) {
    let client = this.app.apolloProvider.defaultClient

    let {data: {post}} = await client.query({query: POST_QUERY, variables: {
      identifier: `@${author}/${permlink}`
    }})

    commit('set_post', post)

    return post
  },

  async fetch_posts ({ commit, state, rootState }) {
    let client = this.app.apolloProvider.defaultClient

    console.log(rootState.author.name, state.after)
    let { data } = await client.query({query: POSTS_QUERY, variables: {
      category: "mapala", // FIXME
      first: 10, // FIXME
      author: rootState.author.name,
      after: state.after
    }})

    let posts = data.posts.edges.map(p => p.node)

		// FIXME Не хорошо это все..
		let posts_deep_copy = JSON.parse(JSON.stringify(posts))

    state.list = state.list.concat(posts_deep_copy)
    if (posts.length > 0) {
      state.after = data.posts.edges[data.posts.edges.length - 1].cursor
    }
  },
}

export const mutations = {
  set_post: (state, post) => state.post = post,

  set_author (state, author) {
    state.author = author
    state.after = undefined
  },

  UNSET_AUTHOR (state, payload) {
    state.author = undefined
    state.after = undefined
  },
}
