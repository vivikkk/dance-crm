<template lang="pug">
div
  v-tabs(
    v-model="selectedTab"
    background-color="primary"
    center-active
    dark
  )
    v-tab(
      v-for="(item, index) in tabs"
      :key="index"
      @click="setDatesRange(item)"
    ) {{ item | dateParse('YYYY-MM') | dateFormat('MMM') }} - {{ getNextMonth(item) | dateParse('YYYY-MM') | dateFormat('MMM') }}

  v-card
    v-simple-table
      template(v-slot:default)
        thead
          tr
            th.text-left ФИО
            th.text-center.border(
              v-for="date in datesRange"
            ) {{ date.start | dateParse('YYYY-MM-DD') | dateFormat('MMMM D') }}
        tbody
          tr(
            v-for="student in group"
            :key="student.id"
          )
            td.text-left {{ student.name }}
            td.text-center.border(
              v-for="date in datesRange"
              :key="date.id"
              @click="clickCellHandler($event, student, date)"
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
                  @click="updateReason"
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
    },
    tabs: {
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
      studentReason: null,
      selectedTab: 1,
      today: new Date().toISOString().substr(0, 7)
    }
  },

  mounted () {
    this.selectedDate = this.today
    this.selectedTab = this.tabs.indexOf(this.today)
  },

  computed: {
    loading () {
      return this.$store.getters.loading
    },
    datesRange () {
      return this.dates.filter(date => (
        date.start.includes(this.selectedDate) || date.start.includes(this.getNextMonth(this.selectedDate))
      ))
    }
  },

  methods: {
    setDatesRange (date) {
      this.selectedDate = date
    },
    getNextMonth (date) {
      const nextMonth = new Date(date)

      nextMonth.setMonth(nextMonth.getMonth() + 1)
      return nextMonth.toISOString().substring(0, 7)
    },
    getCellContent (studentId, dateId) {
      const absentEvent = this.$store.getters.absentEvent(dateId)
      const absentStudent = absentEvent.attendanceList.find(item => item.studentId === studentId)

      if (absentStudent) {
        return absentStudent.reason
      }
    },
    clickCellHandler (nativeEvent, student, date) {
      const absentEvent = this.$store.getters.absentEvent(date.id)
      const absentStudent = absentEvent.attendanceList.find(item => item.studentId === student.id)

      this.selectedNativeElement = nativeEvent.target
      this.selectedStudent = student
      this.selectedDate = date

      if (absentStudent) {
        this.studentReason = absentStudent.reason
      }
      // eslint-disable-next-line no-return-assign
      setTimeout(() => this.selectedOpen = true, 10)
    },
    updateReason () {
      const obj = {
        eventId: this.selectedDate.id,
        studentId: this.selectedStudent.id,
        group: this.selectedStudent.group,
        reason: this.studentReason
      }

      this.$emit('updateReason', obj)
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
