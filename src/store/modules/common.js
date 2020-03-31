export default {
  state: {
    loading: false,
    snackbarText: null,
    errorText: null,
    error: false
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
    },
    setError (state, payload) {
      state.error = true
      state.errorText = payload
    },
    clearError (state) {
      state.error = false
    }
  },

  actions: {
    setLoading ({ commit }, payload) {
      commit('loading', payload)
    },
    async fetchAllData ({ commit, dispatch }) {
      commit('loading', true)
      await dispatch('fetchStudents')
      await dispatch('fetchEvents')
      await dispatch('fetchAttendance')
      commit('loading', false)
    }
  },

  getters: {
    loading (state) {
      return state.loading
    },
    snackbarText (state) {
      return state.snackbarText
    },
    error (state) {
      return state.error
    },
    errorText (state) {
      return state.errorText
    }
  }
}
