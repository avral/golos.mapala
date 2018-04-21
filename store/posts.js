import golos from 'golos-js'

import config from '@/config'
import prepare_html from '@/utils/prepare_html'

export const state = () => ({
  post: {
    title: '',
    body: ''
  },

  list: [],
  limit: config.get_content_limit,
  isLoading: false,

  tags: [config.app_tag],
  author: undefined,
  start_author: undefined,
  start_permlink: undefined,
})

export const actions = {
  async fetch_post ({ commit, state, rootState}, {author, permlink}) {
    let post_in_state = find_post_in_state(state, author, permlink)

    if (post_in_state) {
      return commit('SET_POST', post_in_state)
    }

    await golos.api.getContent(author, permlink, (err, post) => commit('SET_POST', post))
  },
  async fetch_posts ({ commit, state, rootState }) {
    console.log('fetch_posts')
    rootState.isLoading = true
    
    let posts = await golos.api.getDiscussionsByCreated({
      select_tags: state.tags,
      limit: state.limit,
      start_author: state.start_author,
      start_permlink: state.start_permlink,
      select_authors: state.author ? [state.author] : undefined,
    })

    posts = posts.map(post => {
      post.body = prepare_html(post.body).html

      try {
        post.firstImage = JSON.parse(post.json_metadata).image[0]
      } catch (e) {
        post.firstImage = 'http://placehold.it/45x45'
      }

      return post
    })

    let last_post = posts.pop()

    if (last_post) {
      commit('UPDATE_LAST_POST_IN_FEED', last_post)
    }

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
    state.list = payload
  },

  SET_AUTHOR (state, author) {
    state.author = payload
  },

  UNSET_AUTHOR (state, payload) {
    state.author = undefined
  },

  EXTEND_POST_LIST (state, payload) {
    state.list = state.list.concat(payload)
  },

  UPDATE_LAST_POST_IN_FEED (state, last_post) {
    state.start_author = last_post.author
    state.start_permlink = last_post.permlink
  }
}

function find_post_in_state(state, author, permlink) {
  // Вернет пост если он уже есть в ленте
  return state.list.find(p => p.author === author && p.permlink === permlink)
}
