import firebase from 'firebase/app'
import 'firebase/database'

export default {
  state: [],

  mutations: {
    loadAttendance (state, payload) {
      payload.forEach(item => state.push(item))
    },
    addAbsentStudent (state, payload) {
      state.push(payload)
    }
  },

  actions: {
    async fetchAttendance ({ commit }, payload) {
      commit('loading', true)

      const resultAbsenteeList = []

      try {
        const fbVal = await firebase.database().ref('attendance').once('value')
        const events = fbVal.val()

        Object.keys(events).forEach(key => {
          const event = events[key]

          event.id = key
          resultAbsenteeList.push(
            event
          )
        })
        commit('loadAttendance', resultAbsenteeList)
        commit('loading', false)
      } catch (error) {
        commit('loading', false)
        throw error
      }
    },
    async addAbsentEvent ({ commit }, payload) {
      try {
        await firebase.database().ref('attendance').push({
          eventId: payload
        })
      } catch (error) {
        commit('loading', false)
        throw error
      }
    },
    async deleteAbsentEvent ({ commit, getters }, payload) {
      try {
        if (getters.absentEvent(payload)) {
          const absentEvent = getters.absentEvent(payload)

          await firebase.database().ref(`/attendance/${absentEvent.id}`).remove()
        }
      } catch (error) {
        commit('loading', false)
        throw error
      }
    }
  },

  getters: {
    attendance (state) {
      return state
    },
    absentEvent (state) {
      return id => {
        return state.find(obj => {
          return obj.eventId === id
        })
      }
    }
  }
}
