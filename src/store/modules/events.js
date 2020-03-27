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
    async deleteEvent ({ commit, dispatch }, payload) {
      commit('loading', true)

      try {
        await firebase.database().ref(`/events/${payload}`).remove()
        dispatch('deleteAbsentEvent', payload)
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
    async addEvent ({ commit, dispatch }, payload) {
      commit('loading', true)

      try {
        const event = await firebase.database().ref('events').push(payload)

        if (payload.name === 'Занятие') {
          const obj = {
            eventId: event.key,
            group: payload.group,
            start: payload.start
          }

          dispatch('addAbsentEvent', obj)
        }

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
