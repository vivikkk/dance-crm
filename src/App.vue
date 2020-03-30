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
import firebase from 'firebase/app'
import 'firebase/auth'

const defaultLayout = 'default-layout'
const simpleLayout = 'simple-layout'

export default {
  data () {
    return {
      snackbar: false,
      text: null
    }
  },

  mounted () {
    const currentUser = firebase.auth().currentUser

    if (currentUser) {
      this.$store.dispatch('fetchAllData')
    }
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
