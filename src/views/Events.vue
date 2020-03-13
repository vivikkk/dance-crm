<template lang="pug">
v-container
  v-row(
    class="fill-height"
  )
    v-col
      h1 Мероприятия
      v-sheet(height="64")
        v-toolbar(flat color="white")
          v-btn.mr-4(outlined color="grey darken-2" @click="setToday") Сегодня
          v-btn(fab text small color="grey darken-2" @click="prev")
            v-icon(small) mdi-chevron-left
          v-btn(fab text small color="grey darken-2" @click="next")
            v-icon(small) mdi-chevron-right
          v-toolbar-title {{ title }}
          v-spacer
          v-menu(bottom right)
            template(v-slot:activator="{ on }")
              v-btn(outlined color="grey darken-2" v-on="on")
                span {{ typeToLabel[type] }}
                v-icon(right) mdi-menu-down
            v-list
                v-list-item(@click="type = 'week'")
                  v-list-item-title Неделя
                v-list-item(@click="type = 'month'")
                  v-list-item-title Месяц

      v-sheet(height="600")
        v-calendar(
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :now="today"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
        )

        v-menu(
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        )
          v-card(color="grey lighten-4" min-width="350px" flat)
            v-toolbar(:color="selectedEvent.color" dark)
              v-btn(icon)
                v-icon mdi-pencil
              v-toolbar-title(v-html="selectedEvent.name")
              v-spacer
            v-card-text
              span(v-html="selectedEvent.details")
            v-card-actions
              v-btn(text color="secondary" @click="selectedOpen = false") Отмена

  v-btn(
    class="btn"
    color="green"
    fab
    large
    bottom
    absolute
    right
    @click
  )
    v-icon(color="white") mdi-calendar-plus
</template>

<script>
export default {
  data: () => ({
    focus: '',
    type: 'month',
    typeToLabel: {
      month: 'Месяц',
      week: 'Неделя',
      day: 'День'
    },
    start: null,
    end: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [
      {
        name: 'Занятие (ст)',
        start: '2020-03-03',
        color: 'blue'
      },
      {
        name: 'Занятие (мл)',
        start: '2020-03-03',
        color: 'green'
      },
      {
        name: 'Мероприятие',
        start: '2020-03-25',
        color: 'cyan'
      },
      {
        name: 'Выезд',
        start: '2020-03-20',
        end: '2020-03-21',
        color: 'orange'
      }
    ],
    today: '2020-03-14'
  }),
  computed: {
    title () {
      const { start, end } = this
      if (!start || !end) {
        return ''
      }

      const startMonth = this.monthFormatter(start)
      const endMonth = this.monthFormatter(end)
      const suffixMonth = startMonth === endMonth ? '' : endMonth

      const startYear = start.year
      const endYear = end.year
      const suffixYear = startYear === endYear ? '' : endYear

      const startDay = start.day
      const endDay = end.day

      switch (this.type) {
        case 'month':
          return `${startMonth} ${startYear}`
        case 'week':
          return `${startDay} ${startMonth} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`
      }
      return ''
    },
    monthFormatter () {
      return this.$refs.calendar.getFormatter({
        timeZone: 'UTC', month: 'long'
      })
    }
  },
  mounted () {
    this.$refs.calendar.checkChange()
  },
  methods: {
    viewDay ({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor (event) {
      return event.color
    },
    setToday () {
      this.focus = this.today
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        // eslint-disable-next-line no-return-assign
        setTimeout(() => this.selectedOpen = true, 10)
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    updateRange ({ start, end }) {
      this.start = start
      this.end = end
    }
  }
}
</script>
