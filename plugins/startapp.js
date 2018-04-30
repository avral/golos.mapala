export default ({app: { store }}) => {
  window.onNuxtReady(() => {
    store.dispatch('account/init')
    store.dispatch('golos/init')
  })
}
