import axios from 'axios'


export const state = () => ({
  markers: []
})

export const actions = {
  async fetch_markers({ commit, dispatch, state }, bbox) {
    let r = await axios.get('https://mapala.net/api/markers/', {params: {bbox}})
    let all_markers = [...r.data.results, ...state.markers].filter((elem, index, self) => self.findIndex(
    (t) => {return (t.permlink === elem.permlink)}) === index)

    commit('set_markers', all_markers)
  },
}

export const mutations = {
  set_markers: (state, markers) => {
    state.markers = markers
  }
}
