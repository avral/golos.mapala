import golos from 'golos-js'

import Vue from 'vue'

import config from '@/config'
import { get_account, posts_by_blog, posts_by_created } from '@/utils/golos'
import gql from 'graphql-tag'



/* В authors хранится состояния для следующего
 * запроса для автора
 * undefined - Основная летна
 * 
 * Вся задумка в том, что бы хранить загруженными
 * все посты для ленты и для авторов
 * и не перегружать их каждый раз
 */

//  HACK
// Proxy будут работать в Vue 2.6 ждем релиз, костыль
const authors = new Proxy({}, {
  get: function(object, author) {
    if (object.hasOwnProperty(author)) {
      return object[author]
    }

    object[author] = {
      posts: {
        list: [],
        next_page: 1
      },

      profile: {}
    }

    return object[author]
  }
})

export const state = () => ({
  post: {},
  list: [], // current posts

  author: undefined,
  tags: config.app_tags,

  limit: config.get_content_limit,
  isloading: false,
})

export const actions = {
	// TODO Сделать вывод ошибки если запрос не дошел
  async fetch_post ({ commit, state, rootState}, {author, permlink}) {
    let client = this.app.apolloProvider.defaultClient

    let query = gql`
      {
        post(identifier: "@${author}/${permlink}") {
          author,
          permlink,
          title,
          created,
          body,
          thumb,
          jsonMetadata {
            format
          }
        }
      }
    `

    let {data: {post}} = await client.query({query})
    commit('set_post', post)
  },

  async fetch_posts ({ commit, state, rootState, route }) {
    let client = this.app.apolloProvider.defaultClient
    let author = authors[state.author]

    let query = gql`
      query posts ($page: Int!, $author: String, $account: String!) {
        posts(page: $page, author: $author) {
          author,
          permlink,
          title,
          created,
          body,
          thumb,
          isVoted(account: $account)
        }
      }
    `

    let {data: {posts}} = await client.query({query, variables: {
      page: author.posts.next_page,
      author: state.author,
      account: rootState.account.name,
    }})

		// FIXME Не хорошо это все..
		let posts_deep_copy = JSON.parse(JSON.stringify(posts))

    authors[state.author].posts.list = authors[state.author].posts.list.concat(posts_deep_copy)

    author.posts.next_page++

    sync_posts_hack(state)
  },
}

export const mutations = {
  set_post: (state, post) => state.post = post,

  set_author (state, author) {
    state.author = author

    sync_posts_hack(state)
  },

  UNSET_AUTHOR (state, payload) {
    state.author = undefined
  },

  SET_FETCH_METHOD (state, method) {
    state.fetch_method = fetch_methods[method]
  }
}


function sync_posts_hack(state) {
  // HACK
  // синхронизирует посты в authors с state

  state.list = authors[state.author].posts.list
}


function find_post_in_state(state, author, permlink) {
  // Вернет пост если он уже есть в ленте
  // TODO перепилить под новый стиль
  return authors[state.author].posts.list.find(p => p.author === author && p.permlink === permlink)
}
