import firebase from 'firebase/app'
import 'firebase/database'

export default {
  state: [],

  mutations: {
    loadEvents (state, payload) {
      payload.forEach(item => state.push(item))
    },
    deleteEvent (state, payload) {
      const index = state.map(item => item.id).indexOf(payload)

      state.splice(index, 1)
    },
    updateEvent (state, payload) {
      const event = state.find(item => item.id === payload.id)

      Object.keys(event).forEach(key => {
        event[key] = payload[key]
      })
    },
    addEvent (state, payload) {
      state.push(payload)
    }
  },

  actions: {
    async fetchEvents ({ commit }, payload) {
      const resultEvents = []

      commit('loading', true)
      try {
        const fbVal = await firebase.database().ref('events').once('value')
        const events = fbVal.val()

        Object.keys(events).forEach(key => {
          const event = events[key]

          event.id = key
          resultEvents.push(
            event
          )
        })
        commit('loadEvents', resultEvents)
        commit('loading', false)
      } catch (error) {
        commit('loading', false)
        throw error
      }
    },
    async deleteEvent ({ commit }, payload) {
      commit('loading', true)

      try {
        await firebase.database().ref(`/events/${payload}`).remove()
        commit('deleteEvent', payload)
        commit('loading', false)
      } catch (error) {
        commit('loading', false)
        throw error
      }
    },
    async updateEvent ({ commit }, payload) {
      commit('loading', true)

      try {
        await firebase.database().ref('events').child(payload.id).update({
          ...payload
        })

        commit('updateEvent', payload)
        commit('loading', false)
      } catch (error) {
        commit('loading', false)
        throw error
      }
    },
    async updateAttendance ({ commit }, payload) {
      const {
        reason,
        eventId,
        studentId
      } = payload

      await firebase.database().ref('events').child(eventId).update({
        absenteeList: [{
          studentId,
          reason
        }]
      })
      // const event = getters.eventById(eventId)
      // if (event.absenteeList) {
      //   console.log(123)
      // } else {
      //   event.absenteeList = []
      //   event.absenteeList.push({
      //     reason,
      //     studentId
      //   })
      //   console.log(event)
      // }

      // const absenteeList = event.absenteeList
      // const student = absenteeList.find(item => item.id === studentId)

      // if (!reason) {
      //   const index = absenteeList.map(item => item.id).indexOf(studentId)

      //   absenteeList.splice(index, 1)
      // } else if (reason && student) {
      //   student.description = reason
      // } else {
      //   absenteeList.push({
      //     id: studentId,
      //     description: reason
      //   })
      // }
    },
    async addEvent ({ commit }, payload) {
      commit('loading', true)

      try {
        const event = await firebase.database().ref('events').push(payload)

        commit('addEvent', {
          ...payload,
          id: event.key
        })
        commit('loading', false)
      } catch (error) {
        commit('loading', false)
        throw error
      }
    }
  },

  getters: {
    events (state) {
      return state
    },
    lessonsEvents (state) {
      return state.filter(item => item.name === 'Занятие')
        .sort(function (a, b) {
          if (a.start > b.start) {
            return 1
          }
          if (a.start < b.start) {
            return -1
          }
          return 0
        })
    },
    lessonsDates (state, getters) {
      return getters.lessonsEvents.map(lesson => lesson.start)
    },
    firstLessonDate (state, getters) {
      return getters.lessonsDates[0]
    },
    lastLessonDate (state, getters) {
      const datesLength = getters.lessonsDates.length

      return getters.lessonsDates[datesLength - 1]
    },
    eventById (state) {
      return id => {
        return state.find(obj => {
          return obj.id === id
        })
      }
    }
  }
}
