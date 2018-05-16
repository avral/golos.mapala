import golos from 'golos-js'
import { get_account } from '@/utils/golos.js/'


export const state = () => ({
  name: '',

  // TODO сделать пароль для разблокировки
  wif: false, // Залогиненость проверять по этому параметру
})

export const mutations = {
  set_wif: (state, wif) => state.wif = wif,

  set_name: (state, name) => state.name = name
}

export const actions = {
  init({ commit, state, dispatch }) {
    console.log('account init')

    if (state.wif) {
      dispatch('fetch_account')
    }
  },

  async authorization ({ commit, state, dispatch }, { wif, account }) {
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
    commit('set_name', account.name)
    dispatch('fetch_account')
  },

  async logout ({ commit }) {
    commit('set_wif', false)
    commit('set_name', '')
  },

  async fetch_account ({ commit }) {
    // TODO Подгрузка инфы о пользователе
  }
}

export const getters = {
  isAuth: state => state.wif && state.name
}
