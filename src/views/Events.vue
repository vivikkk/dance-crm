<template lang="pug">
v-container
  v-dialog(
    v-model="showDeleteEventDialog"
    max-width="400px"
  )
    v-card
      v-card-title(class="headline") Внимание!
      v-card-text Удалить мероприятие?
      v-card-actions
        v-spacer
        v-btn(
          text
          @click="showDeleteEventDialog = false"
        ) Отмена
        v-btn(
          color="red" text
          @click="deleteEvent"
        ) Удалить

  v-dialog(
    v-if="showAddEventDialog"
    v-model="showAddEventDialog"
    max-width="500px"
    persistent
  )
    AddEventModal(
      :groups="groups"
      :typesEvents="typesEvents"
      :colors="colors"
      @add="createEvent"
      @cancel="showAddEventDialog = false"
    )

  v-row(
    class="fill-height"
    align="center"
    justify="center"
  )
    v-col(
      cols="12"
      lg="8"
    )
      h1.display-2 Календарь событий
      EventsCalendar(
        :events="events"
        :groups="groups"
        :typesEvents="typesEvents"
        :colors="colors"
        @update="updateEvent"
        @delete="deleteModalHandler"
      )

  v-btn(
    class="btn" color="green" fab large
    bottom fixed right
    @click="showAddEventDialog = true"
  )
    v-icon(color="white") mdi-calendar-plus
</template>

<script>
import EventsCalendar from '@/components/EventsCalendar'
import AddEventModal from '@/components/AddEventModal'
import { colors, groups, typesEvents } from '../constants'

export default {
  components: {
    EventsCalendar,
    AddEventModal
  },

  data () {
    return {
      showDeleteEventDialog: false,
      showAddEventDialog: false,
      groups: groups,
      colors: colors,
      typesEvents: typesEvents,
      eventId: null
    }
  },

  computed: {
    loading () {
      return this.$store.getters.loading
    },
    events () {
      return this.$store.getters.events
    }
  },

  methods: {
    deleteModalHandler (id) {
      this.showDeleteEventDialog = true
      this.eventId = id
    },
    deleteEvent () {
      this.showDeleteEventDialog = false
      this.$store.dispatch('deleteEvent', this.eventId)
    },
    updateEvent (event) {
      this.$store.dispatch('updateEvent', event)
    },
    createEvent (event) {
      this.showAddEventDialog = false
      this.$store.dispatch('createEvent', event)
    }
  }
}
</script>
