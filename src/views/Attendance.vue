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
    // TODO: Loader
    v-row
      v-col(cols="12")
        h1 Таблица посещений групп

      v-dialog(
        v-model="isLoading"
        persistent
        width="300"
      )
        v-card(
          color="primary" dark
        )
          v-card-title Пожалуйста, подождите
          v-card-text(class="pt-4")
            v-progress-linear(
              indeterminate
              color="white"
              class="mb-0"
            )

      template(
        v-if="!isLoading"
      )
        v-col(cols="12")
          h2.mb-2 Младшая
          AttendanceTable(
            :tabs="getDatesForTabs"
            :dates="lowGroupLessons"
            :group="lowGroupStudents"
            @update="update"
          )

        v-col(
          cols="12"
        )
          h2.mb-2 Средняя
          AttendanceTable(
            :tabs="getDatesForTabs"
            :dates="midGroupLessons"
            :group="midGroupStudents"
            @update="update"
          )

        v-col(cols="12")
          h2.mb-2 Старшая
          AttendanceTable(
            :tabs="getDatesForTabs"
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
      typesEvents: typesEvents,
      isLoading: true
    }
  },

  mounted () {
    this.isLoading = this.loading
  },

  watch: {
    loading (newValue, oldValue) {
      setTimeout(() => {
        this.isLoading = false
      }, 500)
    }
  },

  computed: {
    loading () {
      return this.$store.getters.loading
    },
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
        datesToTabArr.push(date.toISOString().substring(0, 7))
        date.setMonth(date.getMonth() + 1)
      } while (date.toISOString() < this.lastLessonDate)

      datesToTabArr.push(this.lastLessonDate.substring(0, 7))
      return datesToTabArr.filter((element, index) => (index % 2 === 0))
    }
  },

  methods: {
    addEvent (event) {
      this.addEventDialog = false
      this.$store.dispatch('addEvent', event)
    },
    update (obj) {
      this.$store.commit('updateAttendance', obj)
    }
  }
}
</script>
