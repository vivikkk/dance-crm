import firebase from 'firebase/app'
import 'firebase/database'

export default {
  state: [],

  mutations: {
    loadStudents (state, payload) {
      payload.forEach(item => state.push(item))
    },
    deleteStudent (state, payload) {
      const index = state.map(item => item.id).indexOf(payload)

      state.splice(index, 1)
    },
    updateStudent (state, payload) {
      const student = state.find(item => item.id === payload.id)

      Object.keys(student).forEach(key => {
        student[key] = payload[key]
      })
    },
    addStudent (state, payload) {
      state.push(payload)
    }
  },

  actions: {
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
        commit('loading', false)
      } catch (error) {
        commit('loading', false)
        throw error
      }

      commit('loadStudents', resultStudents)
    },
    async deleteStudent ({ commit }, payload) {
      commit('loading', true)

      try {
        await firebase.database().ref(`/students/${payload}`).remove()

        commit('deleteStudent', payload)
        commit('loading', false)
      } catch (error) {
        commit('loading', false)
        throw error
      }
    },
    async updateStudent ({ commit }, payload) {
      commit('loading', true)

      try {
        await firebase.database().ref('students').child(payload.id).update({
          ...payload
        })

        commit('updateStudent', payload)
        commit('loading', false)
      } catch (error) {
        commit('loading', false)
        throw error
      }
    },
    async addStudent ({ commit }, payload) {
      commit('loading', true)

      try {
        const student = await firebase.database().ref('students').push(payload)

        commit('addStudent', {
          ...payload,
          id: student.key
        })
        commit('loading', false)
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
