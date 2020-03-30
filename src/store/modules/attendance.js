import firebase from 'firebase/app'
import 'firebase/database'

export default {
  state: [],

  mutations: {
    loadAttendance (state, payload) {
      payload.forEach(item => state.push(item))
    },
    deleteAbsentEvent (state, payload) {
      const index = state.map(item => item.eventId).indexOf(payload)

      state.splice(index, 1)
    },
    updateAbsentEvent (state, payload) {
      const event = state.find(item => item.eventId === payload.eventId)
      const {
        reason,
        studentId,
        group,
        id
      } = payload

      if (id && reason) {
        event.attendanceList.push({
          reason,
          studentId,
          group,
          id
        })
      } else if (!id && reason) {
        const student = event.attendanceList.find(item => item.studentId === studentId)

        student.reason = reason
      } else {
        const index = event.attendanceList.map(item => item.eventId).indexOf(payload)

        event.attendanceList.splice(index, 1)
      }
    },
    addAbsentStudent (state, payload) {
      state.push(payload)
    },
    sortAttendanceEvents (state) {
      state.sort((a, b) => {
        if (a.start > b.start) {
          return -1
        }
        if (a.start < b.start) {
          return 1
        }
        return 0
      })
    },
    clearAttendance (state) {
      state.splice(0, state.length)
    }
  },

  actions: {
    async fetchAttendance ({ commit }, payload) {
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
                {
                  ...event.attendanceList[key],
                  id: key
                }
              )
            })
          }
          resultAbsenteeList.push({
            id: key,
            eventId: event.eventId,
            start: event.start,
            attendanceList: arr
          })
        })
        commit('loadAttendance', resultAbsenteeList)
      } catch (error) {
        commit('loading', false)
        throw error
      }
    },
    async addAbsentEvent ({ commit }, payload) {
      commit('loading', true)

      try {
        const event = await firebase.database().ref('attendance').push({
          ...payload
        })

        commit('addAbsentStudent', {
          ...payload,
          id: event.key,
          attendanceList: []
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
        reason,
        group
      } = payload
      const absentEvent = getters.absentEvent(eventId)

      try {
        const ref = await firebase.database().ref(`/attendance/${absentEvent.id}`)
        const currentStudent = absentEvent.attendanceList.find(student => student.studentId === studentId)
        let id = null

        if (!currentStudent) {
          const test = ref.child('attendanceList').push({
            studentId,
            group,
            reason
          })
          id = test.key
        } else if (currentStudent && !reason) {
          ref.child('attendanceList').child(currentStudent.id).remove()
        } else {
          ref.child('attendanceList').child(currentStudent.id).update({
            reason
          })
        }

        commit('updateAbsentEvent', {
          ...payload,
          id
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
          commit('deleteAbsentEvent', payload)
        }
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
