import createPersistedState from 'vuex-persistedstate'

const VERSION = 'mapala_0.1'

export default ({store}) => {
  if (localStorage.getItem(VERSION) == null) localStorage.clear()

  createPersistedState({
      key: VERSION,
      paths: ['account', 'golos', 'editor']
  })(store)
}
