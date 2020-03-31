<template lang="pug">
component(:is="layout")
  router-view

  v-snackbar(
    center
    v-model="snackbar"
    :color="error ? 'error' : 'success'"
    :timeout="5000"
  ) {{ text }}
    v-btn(
      text
      @click="snackbar = false"
    ) Закрыть
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

import { messages } from './constants'

const defaultLayout = 'default-layout'
const simpleLayout = 'simple-layout'

export default {
  data () {
    return {
      snackbar: false,
      snackbarColor: 'snackbar',
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
    loggedIn (newValue) {
      if (newValue) this.$store.dispatch('fetchAllData')
    },
    snackbarText (newValue, oldValue) {
      if (newValue) {
        this.text = newValue
        this.snackbar = true
      }
    },
    error (newValue) {
      if (newValue) {
        const error = this.errorText || 'Что-то пошло не так'
        this.text = messages[error.code]
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
    },
    loggedIn () {
      return this.$store.getters.loggedIn
    },
    error () {
      return this.$store.getters.error
    },
    errorText () {
      return this.$store.getters.errorText
    }
  }
}
</script>
