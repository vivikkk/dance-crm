<template lang="pug">
  v-container
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
      v-row
        v-col(cols="12")
          h1 Таблица посещений групп

        v-col(cols="12")
          h2.mb-2 Младшая
          AttendanceTable(
            :dates="datesLessons"
            :group="lowGroup"
            @update="update"
          )

        v-col(cols="12")
          h2.mb-2 Средняя
          AttendanceTable(
            :dates="datesLessons"
            :group="midGroup"
            @update="update"
          )

        v-col(cols="12")
          h2.mb-2 Старшая
          AttendanceTable(
            :dates="datesLessons"
            :group="highGroup"
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
    students () {
      return this.$store.getters.students
    },
    events () {
      return this.$store.getters.events
    },
    datesLessons () {
      return this.$store.getters.lessonsEvents
    },
    lowGroup () {
      return this.students.filter(student => student.group === 'Младшая')
    },
    midGroup () {
      return this.students.filter(student => student.group === 'Средняя')
    },
    highGroup () {
      return this.students.filter(student => student.group === 'Старшая')
    }
  },

  methods: {
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
