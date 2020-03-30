<template lang="pug">
v-container
  v-dialog(
    :value="loading"
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

  v-row(v-if="!loading")
    v-col(cols="12")
      h2.display-1 Посещаемость
      AttendanceWidget(
        :attendance="attendance"
        :students="students"
      )

    v-col(cols="6")
      h2.mb-4.display-1 Именинники это месяца
      BirthdayWidget(
        :birthdays="birthdays"
      )
</template>

<script>
import AttendanceWidget from '@/components/widgets/AttendanceWidget'
import BirthdayWidget from '@/components/widgets/BirthdayWidget'

export default {
  name: 'Home',

  components: {
    AttendanceWidget,
    BirthdayWidget
  },

  data () {
    return {
      currentMonth: new Date().toISOString().substring(5, 7)
    }
  },

  mounted () {
    this.$store.commit('sortAttendanceEvents')
  },

  computed: {
    loading () {
      return this.$store.getters.loading
    },
    attendance () {
      return this.$store.getters.attendance
    },
    students () {
      return this.$store.getters.students
    },
    birthdays () {
      return this.students.filter(item => item.dateOfBirthday.split('-')[1] === this.currentMonth).sort((a, b) => {
        if (a.dateOfBirthday.split('-')[2] > b.dateOfBirthday.split('-')[2]) {
          return 1
        }
        if (a.dateOfBirthday.split('-')[2] < b.dateOfBirthday.split('-')[2]) {
          return -1
        }
        return 0
      })
    }
  }
}
</script>
