import golos from 'golos-js'
import slugify from 'slugify'

import config from '@/config'
import gql from 'graphql-tag'


export const state = () => ({
  name: '',
  balanceValue: 0,
  meta: {
    profile: {
      profileImage: '',
      coverImage: '',
      website: ''
    }
  }
})

export const actions = {
  async fetch_author({ commit, dispatch, state }, author_name) {
    let client = this.app.apolloProvider.defaultClient

    let query = gql`
      {
        account(name: "${author_name}") {
          name,
          balanceValue
          meta {
            profile {
              profileImage
              coverImage
              website
            }
          }
        }
      }
    `

    let { data: { account } } = await client.query({query})

    commit('set_author', account)
  },
}

export const mutations = {
  set_author: (state, author) => {
    state.name = author
  }
}
