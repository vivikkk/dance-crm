<template lang="pug">
v-container
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

  v-row(v-if="!isLoading")
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

  data () {
    return {
      isLoading: true
    }
  },

  mounted () {
    this.isLoading = this.loading
  },

  watch: {
    loading (newValue, oldValue) {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
      }, 500)
    }
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
