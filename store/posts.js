import golos from 'golos-js'

import Vue from 'vue'

import config from '@/config'
import prepare_html from '@/utils/prepare_html'


/* В authors хранится состояния для следующего
 * запроса для автора
 * undefined - Основная летна
 * 
 * Вся задумка в том, что бы хранить загруженными
 * все посты для ленты и для авторов
 * и не перегружать их каждый раз
 */

const fetch_methods = {
  'created': 'getDiscussionsByCreated',
  'blog': 'getDiscussionsByBlog',
}

//  HACK
// Proxy будут работать в Vue 2.6 ждем релиз, костыль
const authors = new Proxy({}, {
  get: function(object, property) {
    if (object.hasOwnProperty(property)) {
      return object[property]
    }

    object[property] = {
      posts: [],
      start_author: undefined,
      start_permlink: undefined
    }

    return object[property]
  }
})

export const state = () => ({
  post: {},
  list: [], // current posts

  author: undefined,
  tags: config.app_tags,

  // Метод для загрузки постов
  fetch_method: fetch_methods.created, // Default

  limit: config.get_content_limit,
  isloading: false,
})

export const actions = {
  async fetch_post ({ commit, state, rootState}, {author, permlink}) {
    let post_in_state = find_post_in_state(state, author, permlink)

    if (post_in_state) {
      return commit('SET_POST', post_in_state)
    }

    await golos.api.getContent(author, permlink, (err, post) => commit('SET_POST', post))
  },

  async fetch_posts ({ commit, state, rootState, route }) {
    //console.log(authors[state.author].start_author,
    //            authors[state.author].start_permlink)

    //console.log(state.fetch_method)

    rootState.isLoading = true
    var posts = []

    // TODO разобраться с лоадером при последнем посте
    
    if (state.fetch_method == fetch_methods['blog']) {
      // TODO Хак для блога, пофиксят в 17.3 ноде
      let pass = true

      while (pass) {
        let results = await golos.api[state.fetch_method]({
          limit: state.limit,

          select_authors: [state.author],
          start_author: authors[state.author].start_author,
          start_permlink: authors[state.author].start_permlink,
        })

        results.shift()

        if (!results.length) {
          break
        }

        let last_post = results[results.length - 1]
        authors[state.author].start_author = last_post.author
        authors[state.author].start_permlink = last_post.permlink

        // TODO Фильтр вынести в модуль отдельный для голоса
        results = results.filter(p => JSON.parse(p.json_metadata).tags.some(r => state.tags.includes(r)))

        results.map(p => {
          if (posts.length < state.limit) {
            posts.push(p)
          } else {
            pass = false

            let last_post = posts[posts.length - 1]
            authors[state.author].start_author = last_post.author
            authors[state.author].start_permlink = last_post.permlink
          }
        })
      }
    } else {
      posts = await golos.api[state.fetch_method]({
        select_tags: ['mapala'],//state.tags,
        limit: state.limit,

        select_authors: state.author ? [state.author] : undefined,
        start_author: authors[state.author].start_author,
        start_permlink: authors[state.author].start_permlink,
      })

      if (posts.length > 1) {
        var last_post = posts.pop()
      } else if (posts.length == 1) {
        var last_post = posts[0]
      }

      if (last_post) {
        authors[state.author].start_author = last_post.author
        authors[state.author].start_permlink = last_post.permlink
      }
    }

    posts = posts.map(post => {
      post.body = prepare_html(post.body).html

      try {
        post.firstImage = JSON.parse(post.json_metadata).image[0]
      } catch (e) {
        post.firstImage = 'http://placehold.it/45x45'
      }

      return post
    })

    commit('EXTEND_POST_LIST', posts)
    rootState.isLoading = false
  }
}

export const mutations = {
  SET_POST (state, post) {
    post.body = prepare_html(post.body).html

    state.post = post
  },

  SET_POST_LIST (state, payload) {
    authors._current(state).posts(payload)

    sync_posts_hack(state)
  },

  SET_AUTHOR (state, author) {
    console.log('author', author)
    state.author = author

    sync_posts_hack(state)
  },

  UNSET_AUTHOR (state, payload) {
    state.author = undefined
  },

  EXTEND_POST_LIST (state, posts) {
    let author = authors[state.author]
    author.posts = author.posts.concat(posts)

    sync_posts_hack(state)
  },

  SET_FETCH_METHOD (state, method) {
    state.fetch_method = fetch_methods[method]
  }
}

export const getters = {
  posts: state => {
    return state._authors[state.author].posts
  }
}


function sync_posts_hack(state) {
  // HACK
  // синхронизирует посты в authors с state

  state.list = authors[state.author].posts
}


function find_post_in_state(state, author, permlink) {
  // Вернет пост если он уже есть в ленте
  // TODO перепилить под новый стиль
  return authors[state.author].posts.find(p => p.author === author && p.permlink === permlink)
}
