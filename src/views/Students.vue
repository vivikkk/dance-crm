<template lang="pug">
v-container
  v-dialog(
    v-model="dialog"
    :max-width="`${this.isEditModal ? '800px' : '400px'}`"
  )
    // TODO: declination
    component(
      v-if="dialog"
      :is="modalLayout"
      :student="currentStudent"
      @cancel="dialog = false"
      @delete="deleteStudent"
      @update="updateStudent"
      @add="addStudent"
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
        @edit="editStudentHandler"
      )

  v-btn(
    class="btn" color="green" fab large bottom absolute right
    @click="newUserHandler"
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
    modalLayout () {
      return this.isEditModal ? editModal : deleteModal
    },
    currentStudent () {
      return this.$store.getters.studentById(this.studentId)
    }
  },

  // TODO: one handler
  methods: {
    newUserHandler (student) {
      this.studentId = student.id
      this.isEditModal = true
      this.dialog = true
    },
    deleteStudentHandler (student) {
      this.studentId = student.id
      this.isEditModal = false
      this.dialog = true
    },
    editStudentHandler (student) {
      this.studentId = student.id
      this.isEditModal = true
      this.dialog = true
    },
    deleteStudent () {
      this.dialog = false
      this.$store.commit('deleteStudent', this.studentId)
    },
    updateStudent (student) {
      this.dialog = false
      this.$store.commit('updateStudent', student)
    },
    addStudent (student) {
      const studentsLength = this.students.length
      const currentStudentId = studentsLength + 1
      const currentStudent = student

      currentStudent.id = currentStudentId
      this.dialog = false
      this.$store.commit('addStudent', currentStudent)
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
