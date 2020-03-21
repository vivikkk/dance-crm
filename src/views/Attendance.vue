<template lang="pug">
  v-container(fluid)
    v-dialog(
      v-if="addEventDialog"
      v-model="addEventDialog"
      max-width="500px"
      persistent
    )
      AddEventModal(
        :groups="groups"
        :typesEvents="typesEvents"
        :colors="colors"
        isSimpleLesson
        @add="addEvent"
        @cancel="addEventDialog = false"
      )

    v-row
      v-col(cols="12")
        h1 Таблица посещений групп

      v-col(cols="12")
        h2.mb-2 Младшая
        AttendanceTable(
          :dates="lowGroupLessons"
          :group="lowGroupStudents"
          @update="update"
        )

      // TODO: REFACTOR LAST YEAR
      v-col(cols="12")
        h2.mb-2 Средняя
        v-tabs(
          background-color="primary"
          center-active
          dark
        )
          v-tab(
            v-for="(item, index) in getDatesForTabs"
            :key="index"
          ) {{ item | dateParse('YYYY-MM-DD') | dateFormat('MMM') }} - {{ getNextMonth(item) | dateParse('YYYY-MM-DD') | dateFormat('MMM') }}
        AttendanceTable(
          :dates="midGroupLessons"
          :group="midGroupStudents"
          @update="update"
        )

      v-col(cols="12")
        h2.mb-2 Старшая
        AttendanceTable(
          :dates="highGroupLessons"
          :group="highGroupStudents"
          @update="update"
        )

    v-btn(
      class="btn" color="blue" fab large
      bottom absolute right
      @click="addEventDialog = true"
    )
      v-icon(color="white") mdi-calendar-plus
</template>

<script>
import AttendanceTable from '@/components/AttendanceTable'
import AddEventModal from '@/components/AddEventModal'
import { colors, groups, typesEvents } from '../constants'
import { mapGetters } from 'vuex'

export default {
  name: 'Attendance',

  components: {
    AttendanceTable,
    AddEventModal
  },

  data () {
    return {
      addEventDialog: false,
      groups: groups,
      colors: colors,
      typesEvents: typesEvents
    }
  },

  computed: {
    ...mapGetters([
      'students',
      'events',
      'lessonsEvents',
      'lessonsDates',
      'firstLessonDate',
      'lastLessonDate'
    ]),
    lowGroupLessons () {
      return this.lessonsEvents.filter(
        lesson => lesson.group.find(
          group => group === 'Младшая'
        )
      )
    },
    midGroupLessons () {
      return this.lessonsEvents.filter(
        lesson => lesson.group.find(
          group => group === 'Средняя'
        )
      )
    },
    highGroupLessons () {
      return this.lessonsEvents.filter(
        lesson => lesson.group.find(
          group => group === 'Старшая'
        )
      )
    },
    lowGroupStudents () {
      return this.students.filter(student => student.group === 'Младшая')
    },
    midGroupStudents () {
      return this.students.filter(student => student.group === 'Средняя')
    },
    highGroupStudents () {
      return this.students.filter(student => student.group === 'Старшая')
    },
    getDatesForTabs () {
      const datesToTabArr = []
      const date = new Date(this.firstLessonDate)

      do {
        datesToTabArr.push(date.toISOString().substring(0, 10))
        date.setMonth(date.getMonth() + 1)
      } while (date.toISOString() < this.lastLessonDate)

      datesToTabArr.push(this.lastLessonDate)
      return datesToTabArr.filter((element, index) => (index % 2 === 0))
    }
  },

  methods: {
    getNextMonth (date) {
      const nextMonth = new Date(date)
      nextMonth.setMonth(nextMonth.getMonth() + 1)

      return nextMonth.toISOString().substring(0, 10)
    },
    addEvent (event) {
      const eventsLength = this.events.length
      const currentEventId = eventsLength + 1
      const currentEvent = event

      currentEvent.id = currentEventId
      this.addEventDialog = false
      this.$store.commit('addEvent', event)
    },
    update (obj) {
      this.$store.commit('updateAttendance', obj)
    }
  }
}
</script>
