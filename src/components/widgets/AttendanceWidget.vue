<template lang="pug">
  v-data-iterator(
    :items="lessons"
    :items-per-page.sync="itemsPerPage"
    :page="page"
    hide-default-footer
  )
    template(#default="props")
      v-row
        v-col(
          v-for="item in props.items"
          :key="item.eventId"
          v-if="item.attendanceList.length"
          cols="12"
          lg="3"
        )
          v-card
            v-card-title
              span {{ item.start | dateParse('YYYY-MM-DD') | dateFormat('dddd, MMMM DD') }}
            v-divider
            v-list
              v-list-item(dense)
                v-list-item-content Отсутствовали:
                  v-list-item-subtitle(
                    v-for="student in item.attendanceList"
                    ) {{ getStundenName(student.studentId) }} ({{ student.group | shortGroupName }}) — {{ student.reason | lowerCase }}

    template(#footer)
      v-divider
      v-row(
        class="mt-2" align="center" justify="end"
      )
        span(class="mr-4 grey--text") Страница {{ page }} из {{ numberOfPages }}
        v-btn(
          fab dark color="primary" class="mr-1"
          @click="formerPage"
        )
          v-icon mdi-chevron-left
        v-btn(
          fab dark color="primary" class="ml-1"
          @click="nextPage"
        )
          v-icon mdi-chevron-right
</template>

<script>
// import { groups } from '../../constants'

export default {
  name: 'AttendanceWidget',

  props: {
    attendance: {
      type: Array,
      required: true
    },
    students: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      page: 1,
      itemsPerPage: 4
    }
  },

  filters: {
    lowerCase (value) {
      return value.toLowerCase()
    },
    // TODO: global filter
    shortGroupName (value) {
      const groups = {
        Младшая: 'Мл',
        Средняя: 'Ср',
        Старшая: 'Ст'
      }

      return groups[value]
    }
  },

  computed: {
    lessons () {
      return this.attendance
    },
    numberOfPages () {
      return Math.ceil(this.attendance.length / this.itemsPerPage)
    }
  },

  methods: {
    getStundenName (id) {
      const student = this.students.find(student => student.id === id)

      return student.name
    },
    formerPage () {
      if (this.page - 1 >= 1) this.page -= 1
    },
    nextPage () {
      if (this.page + 1 <= this.numberOfPages) this.page += 1
    }
  }
}
</script>
