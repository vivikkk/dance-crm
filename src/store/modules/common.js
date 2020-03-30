export default {
  state: {
    loading: false,
    snackbarText: null
  },

  mutations: {
    loading (state, payload) {
      state.loading = payload
    },
    setSnackbarText (state, payload) {
      state.snackbarText = payload
    },
    clearSnackbarText (state) {
      state.snackbarText = null
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
    },
    snackbarText (state) {
      return state.snackbarText
    }
  }
}
