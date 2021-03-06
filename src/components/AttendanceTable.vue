<template lang="pug">
div
  v-tabs(
    v-model="selectedTabIndex"
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
      template(#default)
        thead
          tr
            th.text-left ФИО
            th.text-center.border(
              v-for="date in datesRange"
            ) {{ date.start | dateParse('YYYY-MM-DD') | dateFormat('MMMM D') }}
        tbody
          tr(
            v-for="student in students"
            :key="student.id"
          )
            td.text-left {{ student.name }}
            td.text-center.border.cursor(
              v-for="date in datesRange"
              :key="date.id"
              :class="{'fill-cell': checkStudentAttendance(student.id, date.id)}"
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
      selectedTabIndex: 0,
      selectedTabDate: null,
      month: new Date().toISOString().substring(0, 7)
    }
  },

  mounted () {
    // TODO: WTF
    const checkMonthIncludeInTabsArray = this.tabs.includes(this.month)

    if (checkMonthIncludeInTabsArray) {
      this.selectedTabDate = this.month
      this.selectedTabIndex = this.tabs.indexOf(this.month)
    } else {
      const prevMonth = this.getPrevMonth(this.month)

      this.selectedTabDate = prevMonth
      this.selectedTabIndex = this.tabs.indexOf(prevMonth)
    }
  },

  computed: {
    loading () {
      return this.$store.getters.loading
    },
    students () {
      const group = this.group

      group.sort((a, b) => {
        if (a.name > b.name) {
          return 1
        }
        if (a.name < b.name) {
          return -1
        }
        return 0
      })
      return group
    },
    datesRange () {
      return this.dates.filter(date => (
        date.start.includes(this.selectedTabDate) || date.start.includes(this.getNextMonth(this.selectedTabDate))
      ))
    }
  },

  methods: {
    setDatesRange (date) {
      this.selectedTabDate = date
    },
    getPrevMonth (date) {
      const prevMonth = new Date(date)

      prevMonth.setMonth(prevMonth.getMonth() - 1)
      return prevMonth.toISOString().substring(0, 7)
    },
    getNextMonth (date) {
      const nextMonth = new Date(date)

      nextMonth.setMonth(nextMonth.getMonth() + 1)
      return nextMonth.toISOString().substring(0, 7)
    },
    getCellContent (studentId, dateId) {
      const absentEvent = this.$store.getters.absentEvent(dateId)

      if (absentEvent) {
        const absentStudent = absentEvent.attendanceList.find(item => item.studentId === studentId)

        return absentStudent ? absentStudent.reason : null
      }
      return false
    },
    checkStudentAttendance (studentId, dateId) {
      const absentEvent = this.$store.getters.absentEvent(dateId)

      if (absentEvent) {
        return !!absentEvent.attendanceList.find(item => item.studentId === studentId)
      }
      return false
    },
    clickCellHandler (nativeEvent, student, date) {
      const absentEvent = this.$store.getters.absentEvent(date.id)
      const absentStudent = absentEvent.attendanceList.find(item => item.studentId === student.id)

      this.selectedNativeElement = nativeEvent.target
      this.selectedStudent = student
      this.selectedDate = date

      if (absentStudent) {
        this.studentReason = absentStudent.reason
      } else {
        this.studentReason = null
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
.fill-cell {
  background-color: #ffebee;
}
</style>
