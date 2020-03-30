<template lang="pug">
v-card(
  max-width="400"
  tile
)
  v-list-item(
    v-for="item in birthdays"
    :key="item.id"
    two-line
  )
    v-list-item-content
      v-list-item-title {{ item.name }}
      v-list-item-subtitle {{ item.dateOfBirthday | dateParse('YYYY-MM-DD') | dateFormat('MMM. DD') }}
</template>

<script>
export default {
  name: 'BithdayWidget',

  props: {
    birthdays: {
      type: Array,
      required: true
    }
  }
}
</script>
