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
            @click="clickCellHandler($event, date, student)"
          ) {{ getCellContent(student.id, date.id) }}

        v-menu(
          v-model="selectedOpen"
          v-if="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedNativeElement"
          offset-x
        )
          v-card(
            color="grey lighten-4" max-width="550px" min-width="350px" flat
          )
            v-toolbar(
              dark
              color="blue"
            )
              v-toolbar-title
                span {{ selectedStudent.name }}
                .caption Дата: {{ selectedDate.start | dateParse('YYYY-MM-DD') | dateFormat('MMMM D, YYYY') }}
            v-card-text.pb-0
              v-text-field(
                label="Причина отсутствия"
                v-model="studentReason"
              )

            v-card-actions
              v-spacer
              v-btn(
                text
                @click="selectedOpen = false"
              ) Отмена
              v-btn(
                text color="green"
                @click="update"
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
      selectedNativeElement: null,
      selectedDate: null,
      selectedStudent: null,
      studentReason: null
    }
  },

  methods: {
    getCellContent (studentId, dateId) {
      const absenteeList = this.$store.getters.eventById(dateId).absenteeList

      if (absenteeList.find(item => item.id === studentId)) {
        return absenteeList.find(item => item.id === studentId).description
      }
    },
    clickCellHandler (nativeEvent, date, student) {
      const reason = date.absenteeList.find(item => item.id === student.id)

      this.studentReason = reason ? reason.description : null
      this.selectedNativeElement = nativeEvent.target
      this.selectedStudent = student
      this.selectedDate = date

      // eslint-disable-next-line no-return-assign
      setTimeout(() => this.selectedOpen = true, 10)
    },

    update () {
      const obj = {
        eventId: this.selectedDate.id,
        studentId: this.selectedStudent.id,
        reason: this.studentReason
      }

      this.$emit('update', obj)
      this.selectedOpen = false
    }
  }
}
</script>

<style scoped>
.border {
  border-left: 1px solid #e0e0e0;
}
</style>
