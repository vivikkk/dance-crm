export default {
  state: [
    {
      id: 1,
      name: 'Занятие',
      start: '2020-03-01',
      end: null,
      description: null,
      group: ['Средняя'],
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
    // TODO: sort
    addEvent (state, payload) {
      state.push(payload)
    },
    updateAttendance (state, payload) {
      const event = state.find(item => item.id === payload.eventId)
      const absenteeList = event.absenteeList
      const student = absenteeList.find(item => item.id === payload.studentId)

      if (!payload.reason) {
        const index = absenteeList.map(item => item.id).indexOf(payload.studentId)

        absenteeList.splice(index, 1)
      } else if (payload.reason && student) {
        student.description = payload.reason
      } else {
        absenteeList.push({
          id: payload.studentId,
          description: payload.reason
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
