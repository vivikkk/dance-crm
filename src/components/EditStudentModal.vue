<template lang="pug">
v-card
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
                v-form(
                  v-model="valid"
                  ref="form"
                  lazy-validation
                )
                  v-row
                    v-col(cols="12" md="8")
                      v-text-field(
                        label="ФИО"
                        v-model="currentStudent.name"
                        :rules="[() => !!currentStudent.name || 'Обязательное поле']"
                      )
                    v-col(cols="12" md="4")
                      v-menu(
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      )
                        template(#activator="{ on }")
                          v-text-field(
                            v-model="currentStudent.dateOfBirthday"
                            label="Дата рождения"
                            prepend-icon="mdi-gift-outline"
                            readonly
                            v-on="on"
                          )
                        v-date-picker(
                          ref="picker"
                          v-model="currentStudent.dateOfBirthday"
                          :max="new Date().toISOString().substr(0, 10)"
                          min="1990-01-01"
                          @change="save"
                        )

                    v-col(cols="12" md="4")
                      v-select(
                        label="Группа"
                        v-model="currentStudent.group"
                        :items="groups"
                        :rules="[() => !!currentStudent.group || 'Обязательное поле']"
                      )
                    v-col(cols="12" md="4")
                      v-select(
                        label="Школа"
                        v-model="currentStudent.school"
                        :items="schools"
                      )
                    v-col(cols="12" md="4")
                      v-select(
                        label="Класс"
                        v-model="currentStudent.classStudy"
                        :items="classes"
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
                      label="Телефон ребенка"
                      v-model="currentStudent.phones.student"
                    )
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
        text color="secondary"
        @click="$emit('cancel')"
      ) Отмена
      v-btn(
        :disabled="!valid"
        text color="green"
        @click="onSubmit"
      ) Сохранить
</template>

<script>
import { schools, groups, classes } from '../constants'

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
      classes: classes,
      groups: groups,
      schools: schools,
      menu: false,
      isEditModal: true,
      valid: false,
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

  created () {
    if (this.student.name) {
      this.isEditModal = true
      this.currentStudent = {
        ...this.student,
        adress: { ...this.student.adress },
        parents: { ...this.student.parents },
        phones: { ...this.student.phones }
      }
    } else {
      this.isEditModal = false
    }
  },

  watch: {
    menu (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },

  methods: {
    save (date) {
      this.$refs.menu.save(date)
    },
    onSubmit () {
      if (this.$refs.form.validate()) {
        if (this.isEditModal) {
          this.$emit('update', this.currentStudent)
        } else {
          this.$emit('add', this.currentStudent)
        }
      }
    }
  }
}
</script>
