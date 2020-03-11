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
      component(
        :is="modal"
        :student="currentStudentName"
        @cancel="dialog = false"
        @delete="deleteStudent"
      )

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
      StudentsTable(
        :headers="computedHeaders"
        :students="students"
        @delete="deleteStudentHandler"
        @edit="editUser"
      )

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
import DeleteModal from '@/components/DeleteStudentModal'
import EditModal from '@/components/EditStudentModal'
import StudentsTable from '@/components/StudentsTable'

const deleteModal = 'delete-modal'
const editModal = 'edit-modal'

export default {
  name: 'Students',

  components: {
    StudentsTable,
    DeleteModal,
    EditModal
  },

  data () {
    return {
      dialog: false,
      indexOfStudent: 0,
      isEditModal: false,
      currentStudentName: '',
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
    },
    modal () {
      return this.isEditModal ? editModal : deleteModal
    }
  },

  methods: {
    deleteStudent () {
      this.$store.commit('deleteStudent', this.indexOfStuden)
      this.dialog = false
    },
    deleteStudentHandler (item) {
      this.indexOfStudent = this.students.indexOf(item)
      this.isEditModal = false
      this.dialog = true
      this.currentStudentName = item.name
    },
    editUser () {
      this.isEditModal = true
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
</style>
