const globalVars = {
  student: 'Ученик',
  parents: 'Родители',
  mother: 'Мама',
  father: 'Папа',
  grandMother: 'Бабушка'
}

const schools = [
  'МКОУ СОШ №1',
  'МКОУ СОШ №2',
  'МКОУ СОШ №3',
  'МКОУ СОШ №4',
  'МКОУ СОШ №5',
  'МКОУ-гимназия №6',
  'МКОУ СОШ №7',
  'Другая школа'
]

const groups = [
  'Младшая',
  'Средняя',
  'Старшая',
  'VIVA KIDS (Ст)',
  'VIVA KIDS (Мл)'
]

const classes = []
for (let i = 1; i <= 11; i++) {
  classes.push(i)
}

const typesEvents = [
  'Занятие',
  'Выступление',
  'Конкурс',
  'Собрание',
  'Открытый урок',
  'Праздник',
  'Мастер-класс',
  'Прогон'
]

const colors = [
  'indigo',
  'deep-purple',
  'cyan',
  'green',
  'orange',
  'red',
  'grey darken-1',
  'blue'
]

export {
  globalVars,
  schools,
  groups,
  classes,
  colors,
  typesEvents
}
