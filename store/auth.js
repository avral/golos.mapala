import golos from 'golos-js'
import { get_account } from '~/utils/golos.js'
import { ACCOUNT_QUERY } from '~/constants/queries.js'


export const state = () => ({
  account: {
    name: '',
    meta: {
      'profile': {}
    },
  },

  // TODO сделать пароль для разблокировки
  wif: false, // Залогиненость проверять по этому параметру
})

export const mutations = {
  set_wif: (state, wif) => state.wif = wif,

  set_account: (state, account) => {
    state.account = account
  }
}

export const actions = {
  init({ commit, state, dispatch }) {

    if (state.wif) {
      dispatch('fetch_account')
    }
  },

  async authorization ({ app, rootState, commit, state, dispatch }, { wif, account }) {
    if (!golos.auth.isWif(wif)) {
      throw new Error('Это не приватный ключ')
    }

    account = await get_account(account)

    if (!account) {
      throw new Error('В GOLOS.IO нет такого пользователя')
    }

    let user_pub = golos.auth.wifToPublic(wif)
    let account_pub = account.posting.key_auths[0][0]
    
    if (user_pub !== account_pub) {
      throw new Error('Ключ пользователя, не подходит к аккаунту')
    }

    commit('set_wif', wif)
    dispatch('fetch_account', account.name)
  },

  async logout ({ commit }) {
    commit('set_wif', false)
    commit('set_account', {
      name: '',
      meta: {
        'profile': {}
      },
    })
  },

  async fetch_account ({ commit, state }, account_name) {
    // TODO Подгрузка инфы о пользователе
    let client = this.app.apolloProvider.defaultClient

    let { data: { account } } = await client.query({query: ACCOUNT_QUERY, variables: {
      name: account_name || state.account.name
    }})


    commit('set_account', account)
  }
}

export const getters = {
  isAuth: state => state.wif && state.account.name
}
