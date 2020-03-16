<template lang="pug">
  v-container
    v-card
      v-simple-table
        template(v-slot:default)
          thead
            tr
              th.text-left ФИО
              th.text-left 20 Февраля
          tbody
            tr(
              v-for="item in group"
              :key="item.id"
            )
              td.text-left {{ item.name }}
              td.text-left Отсутствовал

    v-btn(
      class="btn" color="green" fab large
      bottom absolute right
      @click="addEventDialog = true"
    )
      v-icon(color="white") mdi-calendar-plus
</template>

<script>
export default {
  name: 'Attendance',

  data () {
    return {}
  },

  computed: {
    students () {
      return this.$store.getters.students
    },
    dates () {
      return this.$store.getters.events.filter(date => date.name === 'Занятие')
    },
    group () {
      return this.students.filter(gr => gr.group === 'Средняя')
    }
  }
}
</script>
