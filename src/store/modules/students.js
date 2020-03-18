export default {
  state: [
    {
      id: 1,
      name: 'Ольга Николаевна Мухтарова',
      dateOfBirthday: '2008-03-15',
      group: 'Средняя',
      school: 'МКОУ СОШ №1',
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
      dateOfBirthday: '2002-01-01 ',
      group: 'Средняя',
      school: 'МКОУ-гимназия №6',
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
    },
    {
      id: 3,
      name: 'Виктория Игоревна Фролова',
      dateOfBirthday: '',
      group: 'Старшая',
      school: 'МКОУ-гимназия №6',
      classStudy: 5,
      adress: {
        student: '',
        parents: ''
      },
      parents: {
        mother: '',
        father: '',
        grandMother: ''
      },
      phones: {
        student: '',
        mother: '',
        father: '',
        grandMother: ''
      }
    },
    {
      id: 4,
      name: 'Авдотья Захаровна Игнатьева',
      dateOfBirthday: '',
      group: 'Младшая',
      school: '',
      classStudy: '',
      adress: {
        student: '',
        parents: ''
      },
      parents: {
        mother: '',
        father: '',
        grandMother: ''
      },
      phones: {
        student: '',
        mother: '',
        father: '',
        grandMother: ''
      }
    }
  ],
  mutations: {
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
