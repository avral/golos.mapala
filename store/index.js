export const strict = false

export const state = () => ({
  isLoading: false
})

export const mutations = {
  SET_LOADING (state, loading) {
    state.isLoading = loading
  }
}
