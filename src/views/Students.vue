<template lang="pug">
v-container(fluid)
  v-row(
    align="center"
    justify="center"
  )
    v-col(
        cols="12"
        lg="10"
      )
      v-card
        v-card-title
          v-text-field(
            v-model="search"
            prepend-inner-icon="mdi-account-search"
            label="Поиск"
            single-line
            hide-details
          )
        v-data-table(
          :headers="headers"
          :items="students"
          :search="search"
        )
          template(#item.name="{ value }")
            strong {{value}}
          template(#item.dateOfBirthday="{ value }")
            div {{value}}
          template(#item.parentsNames="{ value }")
            div(v-for="item in value") {{ item }}
          template(#item.parentsPhones="{ value }")
            div(v-for="item in value")
              a(:href="`callto:${item}`") {{ item }}
          template(#item.school="{ value }")
            div {{value}}
          template(#item.parentsAdress="{ value }")
            div {{value}}
          template(#item.studentAdress="{ value }")
            div {{value}}
          template(#item.action="{ item }")
            v-icon(
              medium
              class="mr-2"
            ) mdi-pencil
            v-icon(
              medium
            ) mdi-delete

  v-btn(
    class="btn"
    color="green"
    fab
    large
    bottom
    absolute
    right
  )
    v-icon(color="white") mdi-account-plus
</template>

<script>
export default {
  name: 'Students',

  data () {
    return {
      search: '',
      headers: [
        {
          text: 'ФИО',
          align: 'start',
          filterable: false,
          value: 'name'
        },
        {
          text: 'Год рождения',
          value: 'dateOfBirthday'
        },
        {
          text: 'Школа',
          value: 'school'
        },
        {
          text: 'Адрес ребенка',
          value: 'studentAdress',
          sortable: false
        },
        {
          text: 'Родители',
          value: 'parentsNames',
          sortable: false
        },
        {
          text: 'Контакты родителей',
          value: 'parentsPhones',
          sortable: false
        },
        {
          text: 'Адрес родителей',
          value: 'parentsAdress',
          sortable: false
        },
        {
          text: 'Управление',
          value: 'action',
          sortable: false
        }
      ]
    }
  },

  computed: {
    students () {
      return this.$store.getters.students
    }
  }
}
</script>

<style>
.btn {
  right: 32px !important;
  bottom: 32px !important;
}
</style>
