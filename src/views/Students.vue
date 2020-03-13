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
        v-if="dialog"
        :is="modalLayout"
        :student="currentStudent"
        @cancel="dialog = false"
        @delete="deleteStudent"
        @update="updateStudent"
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
        @edit="editUserHandler"
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
      studentId: null,
      isEditModal: false,
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
    modalLayout () {
      return this.isEditModal ? editModal : deleteModal
    },
    currentStudent () {
      return this.$store.getters.studentById(this.studentId)
    }
  },

  // TODO: one handler
  methods: {
    deleteStudentHandler (user) {
      this.studentId = user.id
      this.isEditModal = false
      this.dialog = true
    },
    editUserHandler (user) {
      this.studentId = user.id
      this.isEditModal = true
      this.dialog = true
    },
    deleteStudent () {
      this.dialog = false
      this.$store.commit('delete', this.currentStudent)
    },
    updateStudent (user) {
      this.dialog = false
      this.$store.commit('update', user)
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
