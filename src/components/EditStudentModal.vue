<template lang="pug">
v-card-text
  v-container
    v-row
      v-col(cols="12")
        v-stepper
          v-stepper-header
            v-stepper-step(
              :step="1"
              :editable="true"
            ) Общее
            v-divider
            v-stepper-step(
              :step="2"
              :editable="true"
            ) Родители
            v-divider
            v-stepper-step(
              :step="3"
              :editable="true"
            ) Контакты
          v-stepper-items
            v-stepper-content(:step="1")
              v-row
                v-col(cols="12" md="8")
                  v-text-field(
                    label="ФИО"
                    v-model="name"
                  )
                v-col(cols="12" md="4")
                  v-text-field(
                    label="Дата рождения"
                    v-model="dateOfBirthday"
                  )
                v-col(cols="12" md="4")
                  v-text-field(
                    label="Группа"
                    v-model="group"
                  )
                v-col(cols="12" md="4")
                  v-text-field(
                    label="Школа"
                    v-model="school"
                  )
                v-col(cols="12" md="4")
                  v-text-field(
                    label="Класс"
                    v-model="classStudy"
                  )
            v-stepper-content(:step="2")
              v-row
                v-col(cols="12")
                  v-text-field(
                    label="Мама"
                    v-model="parents.mother"
                  )
                v-col(cols="12")
                  v-text-field(
                    label="Папа"
                    v-model="parents.father"
                  )
                v-col(cols="12")
                  v-text-field(
                    label="Бабушка"
                    v-model="parents.grandMother"
                  )
            v-stepper-content(:step="3")
              v-row
                v-col(cols="12" md="4")
                  v-text-field(
                    label="Телефон мамы"
                    v-model="phones.mother"
                  )
                v-col(cols="12" md="4")
                  v-text-field(
                    label="Телефон папы"
                    v-model="phones.father"
                  )
                v-col(cols="12" md="4")
                  v-text-field(
                    label="Телефон ребенка"
                    v-model="phones.student"
                  )
                v-col(cols="12")
                  v-text-field(
                    label="Адрес ребенка"
                    v-model="adress.student"
                  )
                v-col(cols="12")
                  v-text-field(
                    label="Адрес родителей"
                    v-model="adress.parents"
                  )
  v-card-actions
    v-spacer
    v-btn(
      text
      @click="$emit('cancel')"
    ) Отмена
    v-btn(
      color="green"
      text
      @click="update"
  ) Сохранить
</template>

<script>
export default {
  name: 'EditModal',

  props: {
    student: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      id: this.student.id,
      name: this.student.name,
      dateOfBirthday: this.student.dateOfBirthday,
      group: this.student.group,
      school: this.student.school,
      classStudy: this.student.classStudy,
      adress: {
        student: this.student.adress.student,
        parents: this.student.adress.parents
      },
      parents: {
        mother: this.student.parents.mother,
        father: this.student.parents.father,
        grandMother: this.student.parents.grandMother
      },
      phones: {
        student: this.student.phones.student,
        mother: this.student.phones.mother,
        father: this.student.phones.father,
        grandMother: this.student.phones.grandMother
      }
    }
  },

  methods: {
    update () {
      const data = this.$data

      this.$emit('update', data)
    }
  }
}
</script>
