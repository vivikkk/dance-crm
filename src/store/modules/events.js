import firebase from 'firebase/app'
import 'firebase/database'

export default {
  state: [],

  mutations: {
    createEvent (state, payload) {
      state.push(payload)
    },
    updateEvent (state, payload) {
      const event = state.find(item => item.id === payload.id)

      Object.keys(event).forEach(key => {
        event[key] = payload[key]
      })
    },
    loadEvents (state, payload) {
      payload.forEach(item => state.push(item))
    },
    deleteEvent (state, payload) {
      const index = state.map(item => item.id).indexOf(payload)

      state.splice(index, 1)
    },
    clearEvents (state) {
      state.splice(0, state.length)
    }
  },

  actions: {
    async createEvent ({ commit, dispatch }, payload) {
      const snackbarText = 'Событие создано'

      commit('loading', true)
      commit('setSnackbarText', snackbarText)
      try {
        const event = await firebase.database().ref('events').push(payload)

        if (payload.name === 'Занятие') {
          const obj = {
            eventId: event.key,
            start: payload.start
          }
          dispatch('addAbsentEvent', obj)
        }

        commit('createEvent', {
          ...payload,
          id: event.key
        })
        commit('loading', false)
      } catch (error) {
        commit('loading', false)
        throw error
      }
    },
    async updateEvent ({ commit }, payload) {
      const snackbarText = 'Событие обновлено'

      commit('loading', true)
      commit('setSnackbarText', snackbarText)
      try {
        await firebase.database().ref('events').child(payload.id).update({
          ...payload
        })
        commit('updateEvent', payload)
        commit('loading', false)
        commit('clearSnackbarText')
      } catch (error) {
        commit('loading', false)
        throw error
      }
    },
    async fetchEvents ({ commit }, payload) {
      const resultEvents = []

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
      } catch (error) {
        commit('loading', false)
        throw error
      }
    },
    async deleteEvent ({ commit, dispatch }, payload) {
      const snackbarText = 'Событие удалено'

      commit('loading', true)
      commit('setSnackbarText', snackbarText)
      try {
        await firebase.database().ref(`/events/${payload}`).remove()
        dispatch('deleteAbsentEvent', payload)
        commit('deleteEvent', payload)
        commit('loading', false)
        commit('clearSnackbarText')
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
        .sort((a, b) => {
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
