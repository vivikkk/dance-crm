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
  'VIVA KIDS'
]

const classes = []

for (let i = 1; i <= 11; i++) {
  classes.push(i)
}

export {
  globalVars,
  schools,
  groups,
  classes
}
