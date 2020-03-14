<template lang="pug">
v-container
  v-dialog(
    v-model="dialog"
    max-width="400px"
  )
    v-card
      v-card-title(class="headline") Внимание!
      v-card-text Удалить мероприятие?
      v-card-actions
        v-spacer
        v-btn(
          text
          @click="dialog = false"
        ) Отмена
        v-btn(
          color="red"
          text
          @click=""
        ) Удалить

  v-row(
    class="fill-height"
  )
    v-col
      h1 Календарь событий
      v-sheet(height="64")
        v-toolbar(flat color="white")
          v-btn(outlined color="grey darken-2 mr-4" @click="setToday") Сегодня
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
          v-card(color="grey lighten-4" max-width="550px" min-width="350px" flat)
            v-toolbar(
              dark
              :color="getEventColor(selectedEvent)"
            )
              v-toolbar-title {{ selectedEvent.name }}
              v-spacer
              v-btn(
                icon
                @click="dialog = true"
              )
                v-icon mdi-trash-can-outline
            v-card-text
              v-select(
                label="Тип занятия"
                v-model="selectedEvent.name"
                :items="typesEvents"
              )
              v-select(
                label="Группа"
                v-model="selectedEvent.group"
                multiple
                :items="groups"
              )
              v-text-field(
                label="Дополнительно"
                v-model="selectedEvent.description"
              )
            v-card-actions
              v-spacer
              v-btn(text color="secondary" @click="selectedOpen = false") Отмена
              v-btn(text color="green" @click="") Сохранить

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
import { colors, groups, typesEvents } from '../constants'

// TODO: event time
export default {
  data: () => ({
    dialog: false,
    groups: groups,
    typesEvents: typesEvents,
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
    today: '2020-03-14'
  }),
  computed: {
    events () {
      return this.$store.getters.events
    },
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
      const eventIndex = this.typesEvents.indexOf(event.name)

      return colors[eventIndex]
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
