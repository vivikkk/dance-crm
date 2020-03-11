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
                  v-text-field(label="ФИО")
                v-col(cols="12" md="4")
                  v-text-field(label="Дата рождения")
                v-col(cols="12" md="4")
                  v-text-field(label="Группа")
                v-col(cols="12" md="4")
                  v-text-field(label="Школа")
                v-col(cols="12" md="4")
                  v-text-field(label="Класс")
            v-stepper-content(:step="2")
              v-row
                v-col(cols="12")
                  v-text-field(label="Мама")
                v-col(cols="12")
                  v-text-field(label="Папа")
                v-col(cols="12")
                  v-text-field(label="Бабушка")
            v-stepper-content(:step="3")
              v-row
                v-col(cols="12" md="4")
                  v-text-field(label="Телефон мамы")
                v-col(cols="12" md="4")
                  v-text-field(label="Телефон папы")
                v-col(cols="12" md="4")
                  v-text-field(label="Телефон ребенка")
                v-col(cols="12")
                  v-text-field(label="Адрес ребенка")
                v-col(cols="12")
                  v-text-field(label="Адрес родителей")
  v-card-actions
    v-spacer
    v-btn(
      text
      @click="dialog = false"
    ) Отмена
    v-btn(
      color="green"
      text
      @click="dialog = false"
  ) Сохранить
</template>

<script>
export default {
  name: 'Edit Modal'
}
</script>
