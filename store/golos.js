import golos from 'golos-js'


export const state = () => ({
  wss: 'wss://ws17.golos.io',
})


export const actions = {
  async init({ state }) {
    golos.config.set('websocket', state.wss)
  }
}
