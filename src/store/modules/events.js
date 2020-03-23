export default {
  state: [
    {
      id: 1,
      name: 'Занятие',
      start: '2020-03-01',
      end: null,
      description: null,
      group: ['Младшая', 'Средняя'],
      absenteeList: [
        {
          id: 1,
          description: 'Тоска'
        },
        {
          id: 5,
          description: 'Приуныла'
        }
      ]
    },
    {
      id: 2,
      name: 'Праздник',
      start: '2020-03-12',
      end: null,
      description: null,
      group: ['Средняя']
    },
    {
      id: 3,
      name: 'Мастер-класс',
      start: '2020-03-05',
      end: '2020-03-06',
      description: 'К нам приедет Мега мастер',
      group: ['VIVA KIDS (Ст)']
    },
    {
      id: 4,
      name: 'Занятие',
      start: '2020-03-03',
      end: null,
      description: null,
      group: ['Средняя'],
      absenteeList: [
        {
          id: 1,
          description: 'Еще раз тоска'
        },
        {
          id: 3,
          description: 'Тошнит'
        }
      ]
    },
    {
      id: 5,
      name: 'Занятие',
      start: '2020-04-20',
      end: null,
      description: null,
      group: ['Младшая', 'Средняя'],
      absenteeList: []
    },
    {
      id: 6,
      name: 'Занятие',
      start: '2020-03-01',
      end: null,
      description: null,
      group: ['Средняя', 'Старшая'],
      absenteeList: []
    }
  ],

  mutations: {
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
    },
    updateAttendance (state, payload) {
      const {
        reason,
        eventId,
        studentId
      } = payload
      const event = state.find(item => item.id === eventId)
      const absenteeList = event.absenteeList
      const student = absenteeList.find(item => item.id === studentId)

      if (!reason) {
        const index = absenteeList.map(item => item.id).indexOf(studentId)

        absenteeList.splice(index, 1)
      } else if (reason && student) {
        student.description = reason
      } else {
        absenteeList.push({
          id: studentId,
          description: reason
        })
      }
    }
  },

  actions: {},

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
