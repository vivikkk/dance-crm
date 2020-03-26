import firebase from 'firebase/app'
import 'firebase/database'

export default {
  state: [],

  mutations: {
    addAbsentStudent (state, payload) {
      state.push(payload)
    }
  },

  actions: {
    async addAbsentStudent ({ commit }, payload) {
      const {
        reason,
        eventId,
        studentId
      } = payload

      commit('loading', true)
      try {
        await firebase.database().ref('attendance').push(payload)

        commit('addAbsentStudent', {
          reason,
          eventId,
          studentId
        })
        commit('loading', false)
      } catch (error) {
        commit('loading', false)
        throw error
      }
    }
  },

  getters: {
    attendance (state) {
      return state
    }
  }
}
