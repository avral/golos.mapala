export const state = () => ({
  isLoading: false
})

export const mutations = {
  SET_LOADING (state, loading) {
    state.isLoading = loading
  }
}

export const actions = {
  init({ commit, state }) {
    console.log('account init')
  }
}
