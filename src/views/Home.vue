<template lang="pug">
v-container
  v-row
    v-col(cols="12")
      h2 Посещаемость
      AttendanceWidget(
        :attendance="attendance"
        :students="students"
      )
  h2 Именниники это месяца
</template>

<script>
import AttendanceWidget from '@/components/widgets/AttendanceWidget'

export default {
  name: 'Home',

  components: {
    AttendanceWidget
  },

  computed: {
    loading () {
      return this.$store.getters.loading
    },
    attendance () {
      this.$store.commit('sortAttendanceEvents')
      return this.$store.getters.attendance
    },
    students () {
      return this.$store.getters.students
    }
  }
}
</script>
