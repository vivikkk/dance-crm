<template lang="pug">
v-card
  v-simple-table
    template(v-slot:default)
      thead
        tr
          th.text-left ФИО
          th.text-center.border(
            v-for="date in dates"
          ) {{ date.start | dateParse('YYYY-MM-DD') | dateFormat('MMMM D, YYYY') }}
      tbody
        tr(
          v-for="student in group"
          :key="student.id"
        )
          td.text-left {{ student.name }}
          td.text-center.border(
            v-for="date in dates"
            :key="date.id"
            @click="test($event, date, student)"
            :class="{'blue-grey lighten-4': getCellColor(student.id, date.id)}"
          ) {{ getCellContent(student.id, date.id) }}

        v-menu(
          v-model="selectedOpen"
          v-if="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        )
          v-card(
            color="grey lighten-4" max-width="550px" min-width="350px" flat
          )
            v-toolbar(
              dark
              color="blue"
            )
              v-toolbar-title {{ selectedStudent.name }}
            v-card-text
              v-text-field(
                label="Причина отсутствия"
              )
            v-card-actions
              v-spacer
              v-btn(
                text
                @click=""
              ) Отмена
              v-btn(
                text color="green"
                @click=""
              ) Сохранить
</template>

<script>
export default {
  name: 'AttendanceTable',

  props: {
    dates: {
      type: Array,
      required: true
    },
    group: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      selectedOpen: false,
      selectedElement: null,
      selectedStudent: null,
      selectedDate: null
    }
  },

  methods: {
    getCellColor (studentId, dateId) {
      const absenteeList = this.$store.getters.eventById(dateId).absenteeList

      if (absenteeList.find(item => item.id === studentId)) {
        return true
      }
      return false
    },
    getCellContent (studentId, dateId) {
      const absenteeList = this.$store.getters.eventById(dateId).absenteeList

      if (absenteeList.find(item => item.id === studentId)) {
        return absenteeList.find(item => item.id === studentId).description
      }
    },
    test (nativeEvent, date, student) {
      this.selectedElement = nativeEvent.target
      this.selectedStudent = student
      // eslint-disable-next-line no-return-assign
      setTimeout(() => this.selectedOpen = true, 10)
    }
  }
}
</script>

<style scoped>
.border {
  border-left: 1px solid #e0e0e0;
}
</style>
