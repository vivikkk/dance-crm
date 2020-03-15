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

  EventsCalendar(
    :events="events"
    :groups="groups"
    :typesEvents="typesEvents"
    :colors="colors"
  )

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
import EventsCalendar from '@/components/EventsCalendar'
import { colors, groups, typesEvents } from '../constants'

// TODO: event time
export default {
  components: {
    EventsCalendar
  },

  data () {
    return {
      dialog: false,
      groups: groups,
      colors: colors,
      typesEvents: typesEvents
    }
  },

  computed: {
    events () {
      return this.$store.getters.events
    }
  }
}
</script>
