<template lang="pug">
div
  v-card-title(
    class="headline"
  ) {{ isEditModal ? 'Редактирование профиля' : 'Новый пользователь' }}
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
                      v-model="currentStudent.name"
                    )
                  v-col(cols="12" md="4")
                    v-text-field(
                      label="Дата рождения"
                      v-model="currentStudent.dateOfBirthday"
                    )
                  v-col(cols="12" md="4")
                    v-text-field(
                      label="Группа"
                      v-model="currentStudent.group"
                    )
                  v-col(cols="12" md="4")
                    v-text-field(
                      label="Школа"
                      v-model="currentStudent.school"
                    )
                  v-col(cols="12" md="4")
                    v-text-field(
                      label="Класс"
                      v-model="currentStudent.classStudy"
                    )
              v-stepper-content(:step="2")
                v-row
                  v-col(cols="12")
                    v-text-field(
                      label="Мама"
                      v-model="currentStudent.parents.mother"
                    )
                  v-col(cols="12")
                    v-text-field(
                      label="Папа"
                      v-model="currentStudent.parents.father"
                    )
                  v-col(cols="12")
                    v-text-field(
                      label="Бабушка"
                      v-model="currentStudent.parents.grandMother"
                    )
              v-stepper-content(:step="3")
                v-row
                  v-col(cols="12" md="4")
                    v-text-field(
                      label="Телефон мамы"
                      v-model="currentStudent.phones.mother"
                    )
                  v-col(cols="12" md="4")
                    v-text-field(
                      label="Телефон папы"
                      v-model="currentStudent.phones.father"
                    )
                  v-col(cols="12" md="4")
                    v-text-field(
                      label="Телефон ребенка"
                      v-model="currentStudent.phones.student"
                    )
                  v-col(cols="12")
                    v-text-field(
                      label="Адрес ребенка"
                      v-model="currentStudent.adress.student"
                    )
                  v-col(cols="12")
                    v-text-field(
                      label="Адрес родителей"
                      v-model="currentStudent.adress.parents"
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
      isEditModal: true,
      currentStudent: {
        id: '',
        name: '',
        dateOfBirthday: '',
        group: '',
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
    }
  },

  mounted () {
    if (this.student.name) {
      this.isEditModal = true
      this.currentStudent = Object.assign({}, this.student)
    } else {
      this.isEditModal = false
    }
  },

  methods: {
    update () {
      if (this.isEditModal) {
        this.$emit('update', this.currentStudent)
      } else {
        this.$emit('add', this.currentStudent)
      }
    }
  }
}
</script>
