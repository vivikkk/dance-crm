<template lang="pug">
v-card
  v-simple-table
    template(v-slot:default)
      thead
        tr
          th.text-left ФИО
          th.text-center.border(
            v-for="item in dates"
          ) {{ item.start | dateParse('YYYY-MM-DD') | dateFormat('MMMM D, YYYY') }}
      tbody
        tr(
          v-for="item in group"
          :key="item.id"
        )
          td.text-left {{ item.name }}
          td.text-center.border(
            v-for="date in dates"
            :key="date.id"
          ) {{ getCellContent(item.id, date.id) }}
</template>

<script>
export default {
  name: 'AttendanceTable',

  props: {
    dates: {
      type: Array,
      required: true
    },
    group: {
      type: Array,
      required: true
    }
  },

  methods: {
    getCellContent (id, dateId) {
      const absenteeList = this.$store.getters.eventById(dateId).absenteeList

      if (absenteeList.find(item => item.id === id)) {
        return 'Нет'
      }
    }
  }
}
</script>

<style scoped>
.border {
  border-left: 1px solid #e0e0e0;
}
</style>
