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
          const arr = []

          if (event.attendanceList) {
            Object.keys(event.attendanceList).forEach(key => {
              arr.push(
                { ...event.attendanceList[key] }
              )
            })
          }

          resultAbsenteeList.push({
            id: key,
            eventId: event.eventId,
            start: event.start,
            group: event.group,
            attendanceList: arr
          })
        })
        commit('loadAttendance', resultAbsenteeList)
        commit('loading', false)
      } catch (error) {
        commit('loading', false)
        throw error
      }
    },
    async addAbsentEvent ({ commit }, payload) {
      commit('loading', true)

      try {
        await firebase.database().ref('attendance').push({
          ...payload
        })
        commit('loading', false)
      } catch (error) {
        commit('loading', false)
        throw error
      }
    },
    async updateAbsentEvent ({ commit, getters }, payload) {
      const {
        eventId,
        studentId,
        reason
      } = payload
      const absentEvent = getters.absentEvent(eventId)
      const ref = await firebase.database().ref(`/attendance/${absentEvent.id}`)

      ref.child('attendanceList').push({
        studentId,
        reason
      })
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
