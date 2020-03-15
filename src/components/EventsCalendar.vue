<template lang="pug">
v-row(
  class="fill-height"
)
  v-col
    h1 Календарь событий
    v-sheet(height="64")
      v-toolbar(
        flat color="white"
      )
        v-btn(
          outlined color="grey darken-2 mr-4"
          @click="setToday"
        ) Сегодня
        v-btn(
          fab text small color="grey darken-2"
          @click="prev"
        )
          v-icon(small) mdi-chevron-left
        v-btn(
          fab text small color="grey darken-2"
          @click="next"
        )
          v-icon(small) mdi-chevron-right
        v-toolbar-title {{ title }}
        v-spacer
        v-menu(
          bottom right
        )
          template(#activator="{ on }")
            v-btn(
              outlined color="grey darken-2"
              v-on="on"
            )
              span {{ typeToLabel[type] }}
              v-icon(right) mdi-menu-down
          v-list
              v-list-item(
                @click="type = 'week'"
              )
                v-list-item-title Неделя
              v-list-item(
                @click="type = 'month'"
              )
                v-list-item-title Месяц

    v-sheet(height="600")
      v-calendar(
        ref="calendar"
        v-model="focus"
        color="primary"
        :events="myEvents"
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
        v-card(
          color="grey lighten-4" max-width="550px" min-width="350px" flat
        )
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

            v-menu(
              ref="startTimeMenu"
              v-model="startTimeMenu"
              :close-on-content-click="false"
              :return-value.sync="selectedEvent.start"
              transition="scale-transition"
              offset-y
              min-width="290px"
            )
              template(
                v-slot:activator="{ on }"
              )
                v-text-field(
                  v-model="selectedEvent.start"
                  label="Начало события"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-on="on"
                  hint="YYYY/MM/DD/"
                  persistent-hint
                  clearable
                  @click:clear="selectedEvent.start = null"
                )
              v-date-picker(
                no-title scrollable
                v-model="selectedEvent.start"
              )
                v-spacer
                v-btn(
                  text color="primary"
                  @click="startTimeMenu = false"
                ) Отмена
                v-btn(
                  text color="primary"
                  @click="$refs.startTimeMenu.save(selectedEvent.start)"
                ) Ок

            v-menu(
              ref="endTimeMenu"
              v-model="endTimeMenu"
              :close-on-content-click="false"
              :return-value.sync="selectedEvent.end"
              transition="scale-transition"
              offset-y
              min-width="290px"
            )
              template(
                v-slot:activator="{ on }"
              )
                v-text-field(
                  v-model="selectedEvent.end"
                  label="Конец события"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-on="on"
                  hint="YYYY/MM/DD/"
                  persistent-hint
                  clearable
                  @click:clear="selectedEvent.end = null"
                )
              v-date-picker(
                no-title scrollable
                v-model="selectedEvent.end"
              )
                v-spacer
                v-btn(
                  text color="primary"
                  @click="endTimeMenu = false"
                ) Отмена
                v-btn(
                  text color="primary"
                  @click="$refs.endTimeMenu.save(selectedEvent.end)"
                ) Ок

            v-card-actions
              v-spacer
              v-btn(
                text color="secondary"
                @click="selectedOpen = false"
              ) Отмена
              v-btn(
                text color="green"
                @click=""
              ) Сохранить
</template>

<script>
export default {
  name: 'EventsCalendar',

  props: {
    events: {
      type: Array,
      required: true
    },
    groups: {
      type: Array,
      required: true
    },
    typesEvents: {
      type: Array,
      required: true
    },
    colors: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      focus: '',
      type: 'month',
      myEvents: [],
      typeToLabel: {
        month: 'Месяц',
        week: 'Неделя',
        day: 'День'
      },
      selectedEvent: {},
      start: null,
      end: null,
      selectedElement: null,
      selectedOpen: false,
      startTimeMenu: false,
      endTimeMenu: false,
      today: new Date().toISOString().substr(0, 10)
    }
  },

  mounted () {
    this.$refs.calendar.checkChange()
    this.myEvents = Object.assign([], this.events)
  },

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

  methods: {
    viewDay ({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor (event) {
      const eventIndex = this.typesEvents.indexOf(event.name)

      return this.colors[eventIndex]
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
        this.selectedEvent = Object.assign({}, event)
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
