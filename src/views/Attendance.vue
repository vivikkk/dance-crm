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
          h1 Таблица посещений
        v-col(cols="12")
          h2 Младшая группа
        v-col(cols="12")
          h2 Средняя группа
        v-col(cols="12")
          v-card
            v-simple-table
              template(v-slot:default)
                thead
                  tr
                    th.text-left ФИО
                    th.text-center(
                      v-for="item in datesLessons"
                    ) {{ item.start | dateParse('YYYY-MM-DD') | dateFormat('MMMM D, YYYY') }}
                tbody
                  tr(
                    v-for="item in group"
                    :key="item.id"
                  )
                    td.text-left {{ item.name }}
                    td.text-center.border(
                      v-for="date in datesLessons"
                      :key="date.id"
                    ) {{ getCellContent(item.id, date.id) }}
        v-col(cols="12")
          h2 Старшая группа

    v-btn(
      class="btn" color="green" fab large
      bottom absolute right
      @click="addEventDialog = true"
    )
      v-icon(color="white") mdi-calendar-plus
</template>

<script>
import AddEventModal from '@/components/AddEventModal'
import { colors, groups, typesEvents } from '../constants'

export default {
  name: 'Attendance',

  components: {
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
    group () {
      return this.students.filter(gr => gr.group === 'Средняя')
    }
  },

  methods: {
    getCellContent (id, dateId) {
      const absenteeList = this.$store.getters.eventById(dateId).absenteeList

      if (absenteeList.find(item => item.id === id)) {
        return 'Нет'
      }
    },
    addEvent (event) {
      const eventsLength = this.events.length
      const currentEventId = eventsLength + 1
      const currentEvent = event

      currentEvent.id = currentEventId
      this.addEventDialog = false
      this.$store.commit('addEvent', event)
    }
  }
}
</script>

<style scoped>
.border {
  border-left: 1px solid #e0e0e0;
  cursor: pointer;
}
</style>
