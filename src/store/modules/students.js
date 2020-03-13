export default {
  // TODO: timestamp filter
  state: [
    {
      id: 1,
      name: 'Ольга Николаевна Мухтарова',
      dateOfBirthday: 1268239325,
      group: 'Старшая',
      school: 'МКОУ СОШ №5',
      classStudy: 10,
      adress: {
        student: 'Парковая 1-24',
        parents: ''
      },
      parents: {
        mother: 'Светлана Ивановна Мухтарова',
        father: 'Светлан Иванович Мухтаров',
        grandMother: 'Клавдия Ивановна Мухтарова'
      },
      phones: {
        student: '+79201111111',
        mother: '+79205645332',
        father: '+79205645432',
        grandMother: ''
      }
    },
    {
      id: 2,
      name: 'Василиса Игоревна Твердолобова',
      dateOfBirthday: 1236012125,
      group: 'Старшая',
      school: 'МКОУ Гимназия №6',
      classStudy: 8,
      adress: {
        student: 'Первомайская, 23 а-3',
        parents: 'Бессолова, 3-6'
      },
      parents: {
        mother: '',
        father: 'Кольбас Сергеевич Твердолобов',
        grandMother: ''
      },
      phones: {
        student: '+79202222222',
        mother: '+79275111332',
        father: '',
        grandMother: ''
      }
    }
  ],
  mutations: {
    delete (state, payload) {
      const index = state.indexOf(payload)

      state.splice(index, 1)
    },
    update (state, payload) {
      const student = state.find(a => {
        return a.id === payload.id
      })

      Object.keys(student).forEach(key => {
        student[key] = payload[key]
      })
    },
    add (state, payload) {
      state.push(payload)
    }
  },
  actions: {},
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
