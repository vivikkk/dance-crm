export default {
  state: {
    loading: false
  },

  mutations: {
    loading (state, payload) {
      state.loading = payload
    }
  },

  actions: {
    setLoading ({ commit }, payload) {
      commit('loading', payload)
    }
  },

  getters: {
    loading (state) {
      return state.loading
    }
  }
}
