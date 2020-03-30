import firebase from 'firebase/app'
import 'firebase/database'

export default {
  state: [],

  mutations: {
    createStudent (state, payload) {
      state.push(payload)
    },
    updateStudent (state, payload) {
      const student = state.find(item => item.id === payload.id)

      Object.keys(student).forEach(key => {
        student[key] = payload[key]
      })
    },
    loadStudents (state, payload) {
      payload.forEach(item => state.push(item))
    },
    deleteStudent (state, payload) {
      const index = state.map(item => item.id).indexOf(payload)

      state.splice(index, 1)
    }
  },

  actions: {
    async createStudent ({ commit }, payload) {
      const snackbarText = 'Студент добавлен'

      commit('loading', true)
      commit('setSnackbarText', snackbarText)
      try {
        const student = await firebase.database().ref('students').push(payload)

        commit('createStudent', {
          ...payload,
          id: student.key
        })
        commit('loading', false)
        commit('clearSnackbarText')
      } catch (error) {
        commit('loading', false)
        throw error
      }
    },
    async updateStudent ({ commit }, payload) {
      const snackbarText = 'Данные студента обновлены'

      commit('loading', true)
      commit('setSnackbarText', snackbarText)
      try {
        await firebase.database().ref('students').child(payload.id).update({
          ...payload
        })
        commit('updateStudent', payload)
        commit('loading', false)
        commit('clearSnackbarText')
      } catch (error) {
        commit('loading', false)
        throw error
      }
    },
    async fetchStudents ({ commit }, payload) {
      commit('loading', true)

      const resultStudents = []

      try {
        const fbVal = await firebase.database().ref('students').once('value')
        const students = fbVal.val()

        Object.keys(students).forEach(key => {
          const student = students[key]

          student.id = key
          resultStudents.push(
            student
          )
        })
        commit('loadStudents', resultStudents)
        commit('loading', false)
      } catch (error) {
        commit('loading', false)
        throw error
      }
    },
    async deleteStudent ({ commit }, payload) {
      const snackbarText = 'Студент удален'

      commit('loading', true)
      commit('setSnackbarText', snackbarText)
      try {
        await firebase.database().ref(`/students/${payload}`).remove()
        commit('deleteStudent', payload)
        commit('loading', false)
        commit('clearSnackbarText')
      } catch (error) {
        commit('loading', false)
        throw error
      }
    }
  },

  getters: {
    students (state) {
      return state
    },
    studentById (state) {
      return id => {
        if (id) {
          return state.find(obj => {
            return obj.id === id
          })
        } else {
          return {}
        }
      }
    }
  }
}
