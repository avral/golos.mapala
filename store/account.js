import golos from 'golos-js'


export const state = () => ({
  name: '',

  // TODO сделать пароль для разблокировки
  wif: false, // Залогиненость проверять по этому параметру
})

export const mutations = {
  SET_LOADING (state, loading) {
    state.isLoading = loading
  },

  SET_WIF (state, wif) {
    if(!golos.auth.isWif(wif)) {
      throw new Error('This is not WIF')
    }

    state.wif = wif
  },

  set_name: (state, name) => state.name = name
}

export const actions = {
  init({ commit, state }) {
    console.log('account init')
  }
}
