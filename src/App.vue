<template lang="pug">
component(:is="layout")
  router-view
</template>

<script>
const defaultLayout = 'default-layout'
const simpleLayout = 'simple-layout'

export default {
  computed: {
    layout () {
      return this.$route.name === 'Login' ? simpleLayout : defaultLayout
    }
  }
}
</script>
