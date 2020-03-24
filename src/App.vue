<template lang="pug">
component(:is="layout")
  router-view
</template>

<script>
const defaultLayout = 'default-layout'
const simpleLayout = 'simple-layout'

export default {
  created () {
    this.$store.dispatch('fetchStudents')
    this.$store.dispatch('fetchEvents')
  },

  computed: {
    layout () {
      return this.$route.name === 'Login' ? simpleLayout : defaultLayout
    },
    error () {
      return this.$store.getters.error
    }
  }
}
</script>
