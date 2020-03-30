import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  state: {},

  mutations: {},

  actions: {
    async login ({ commit }, payload) {
      const {
        email,
        password
      } = payload

      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (error) {
        commit('loading', false)
        throw error
      }
    },
    async logout () {
      await firebase.auth().signOut()
    }
  },

  getters: {}
}
