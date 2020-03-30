<template lang="pug">
component(:is="layout")
  router-view

  v-snackbar(
    v-model="snackbar"
    left :timeout="5000"
  ) {{ text }}
    v-btn(
      color="pink"
      text
      @click="snackbar = false"
    ) Закрыть
</template>

<script>
const defaultLayout = 'default-layout'
const simpleLayout = 'simple-layout'

export default {
  data () {
    return {
      snackbar: false,
      text: null
    }
  },

  created () {
    this.$store.dispatch('fetchStudents')
    this.$store.dispatch('fetchEvents')
    this.$store.dispatch('fetchAttendance')
  },

  watch: {
    snackbarText (newValue, oldValue) {
      if (newValue) {
        this.text = newValue
        this.snackbar = true
      }
    }
  },

  computed: {
    layout () {
      return this.$route.name === 'Login' ? simpleLayout : defaultLayout
    },
    snackbarText () {
      return this.$store.getters.snackbarText
    }
  }
}
</script>
