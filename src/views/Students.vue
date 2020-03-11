<template lang="pug">
v-container
  v-dialog(
    v-model="dialog"
    :max-width="`${this.isEditModal ? '800px' : '400px'}`"
  )
    // TODO: declination
    v-card
      v-card-title(
        class="headline"
      ) {{ formTitle }}
      template(v-if="!isEditModal")
        DeleteModal(studentName="Elena")
      template(v-else)
        EditModal

  v-row
    v-col
      h1 Ученики и их родители
      v-switch(
        v-model="showAllColumns"
        label="Показать все колонки"
      )
  v-row(
    align="center"
    justify="center"
  )
    v-col(
      cols="12"
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
          :headers="computedHeaders"
          :fixed-header="true"
          :items="students"
          :search="search"
          align="start"
        )
          template(#item.name="{ value }")
            strong {{ value }}

          template(#item.dateOfBirthday="{ value }")
            div {{ value }}

          template(#item.parents="{ value }")
            .mt-2.mb-2(
              v-for="(val, key) in value"
              v-if="val"
            )
              strong.mr-1 {{ getGlobalVars(key) }}:
              span {{ val }}

          template(#item.phones="{ value }")
            .mt-2.mb-2(
              v-for="(val, key) in value"
              v-if="val"
            )
              strong.mr-1 {{ getGlobalVars(key) }}:
              a(:href="`callto:${val}`") {{ val }}

          template(#item.school="{ value }")
            span {{ value }}

          template(#item.classStudy="{ value }")
            span {{ value }}

          template(#item.adress="{ value }")
            .mt-2.mb-2(
              v-for="(val, key) in value"
              v-if="val"
            )
              strong.mr-1 {{ getGlobalVars(key) }}:
              span {{ val }}

          template(#item.group="{ value }")
            div {{ value }}

          template(#item.action="{ item }")
            v-icon(
              medium
              class="mr-2"
              @click="editItem(item)"
            ) mdi-pencil
            v-icon(
              medium
              @click="deleteItem(item)"
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
import DeleteModal from '@/components/DeleteUserModal'
import EditModal from '@/components/EditUserModal'

class Student {
  constructor ({ name, dateOfBirthday, group, school, classStudy, adress, parents, phones }) {
    this.name = name
    this.dateOfBirthday = dateOfBirthday
    this.group = group
    this.school = school
    this.classStudy = classStudy
    this.adress = adress
    this.parents = parents
    this.phones = phones
  }
}

export default {
  name: 'Students',

  components: {
    DeleteModal,
    EditModal
  },

  data () {
    return {
      dialog: false,
      isEditModal: false,
      currentStudent: null,
      currentStudentName: '',
      search: '',
      showAllColumns: false,
      headers: [
        {
          text: 'ФИО',
          align: 'start',
          value: 'name',
          hideByDefault: false
        },
        {
          text: 'Дата рождения',
          value: 'dateOfBirthday',
          hideByDefault: false
        },
        {
          text: 'Группа',
          value: 'group',
          hideByDefault: false
        },
        {
          text: 'Школа',
          value: 'school',
          hideByDefault: true
        },
        {
          text: 'Класс',
          value: 'classStudy',
          hideByDefault: false
        },
        {
          text: 'Адрес',
          value: 'adress',
          hideByDefault: true,
          sortable: false
        },
        {
          text: 'Родители',
          value: 'parents',
          hideByDefault: false,
          sortable: false
        },
        {
          text: 'Контакты',
          value: 'phones',
          hideByDefault: false,
          sortable: false
        },
        {
          text: 'Управление',
          value: 'action',
          hideByDefault: false,
          sortable: false
        }
      ]
    }
  },

  computed: {
    students () {
      return this.$store.getters.students
    },
    computedHeaders () {
      return this.showAllColumns ? this.headers : this.headers.filter(header => !header.hideByDefault)
    },
    formTitle () {
      return this.isEditModal ? 'Редактирование профиля' : 'Внимание!'
    }
  },

  // TODO:: global vars
  methods: {
    getGlobalVars (key) {
      const keys = {
        student: 'Ученик',
        parents: 'Родители',
        mother: 'Мама',
        father: 'Папа',
        grandMother: 'Бабушка'
      }

      return keys[key]
    },
    editItem (item) {
      this.currentStudent = new Student({ ...item })
      this.isEditModal = true
      this.dialog = true
    },
    deleteItem (item) {
      this.currentStudent = new Student({ ...item })
      this.currentStudentName = this.currentStudent.name
      this.isEditModal = false
      this.dialog = true
    }
  }
}
</script>

<style>
.btn {
  right: 32px !important;
  bottom: 32px !important;
}
span {
  white-space: nowrap;
}
</style>
