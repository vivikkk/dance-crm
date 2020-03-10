export default {
  state: [
    {
      name: 'Ольга Николаевна Мухтарова',
      sex: 0,
      dateOfBirthday: 1268239325,
      school: 'МКОУ СОШ №5',
      studentAdress: 'Парковая 1-24',
      parentsAdress: 'Парковая 1-24',
      parentsNames: ['Светлана Ивановна Мухтарова', 'Светлан Иванович Мухтаров'],
      parentsPhones: ['+79205645332', '+79205437632']
    },
    {
      name: 'Василиса Игоревна Твердолобова',
      sex: 0,
      dateOfBirthday: 1236012125,
      school: 'МКОУ-Гимназия №6',
      studentAdress: 'Первомайская, 23 а-3',
      parentsAdress: 'Парковая 1-24',
      parentsNames: ['Кольбас Сергеевич Твердолобов'],
      parentsPhones: ['+79275111332']
    }
  ],
  mutations: {},
  actions: {},
  getters: {
    students (state) {
      return state
    }
  }
}
