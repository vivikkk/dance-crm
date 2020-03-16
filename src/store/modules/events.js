export default {
  state: [
    {
      id: 1,
      name: 'Занятие',
      start: '2020-03-01',
      end: null,
      description: '',
      group: ['Младшая']
    },
    {
      id: 2,
      name: 'Праздник',
      start: '2020-03-12',
      end: null,
      description: '',
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
      start: '2020-03-01',
      end: null,
      description: '',
      group: ['VIVA KIDS (Ст)']
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
    addEvent (state, payload) {}
  },
  actions: {},
  getters: {
    events (state) {
      return state
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
