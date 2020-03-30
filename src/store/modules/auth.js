import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  state: {
    loggedIn: false
  },

  mutations: {
    login (state) {
      state.loggedIn = true
    },
    logout (state) {
      state.loggedIn = false
    }
  },

  actions: {
    async login ({ commit }, payload) {
      const {
        email,
        password
      } = payload

      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
        commit('login')
      } catch (error) {
        commit('loading', false)
        throw error
      }
    },
    async logout ({ commit }) {
      try {
        await firebase.auth().signOut()
        commit('clearEvents')
        commit('clearAttendance')
        commit('clearStudents')
        commit('logout')
      } catch (error) {
        commit('loading', false)
        throw error
      }
    }
  },

  getters: {
    loggedIn (state) {
      return state.loggedIn
    }
  }
}
