<template lang="pug">
v-container
  //TODO: modal in component
  v-dialog(
    v-model="deleteEventDialog"
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
          color="red" text
          @click="deleteEvent"
        ) Удалить

  v-dialog(
    v-if="addEventDialog"
    v-model="addEventDialog"
    max-width="500px"
  )
    AddEventModal(
      :groups="groups"
      :typesEvents="typesEvents"
      :colors="colors"
      @add="addEvent"
      @cancel="addEventDialog = false"
    )

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
    bottom absolute right
    @click="addEventDialog = true"
  )
    v-icon(color="white") mdi-calendar-plus
</template>

<script>
import EventsCalendar from '@/components/EventsCalendar'
import AddEventModal from '@/components/AddEventModal'
import { colors, groups, typesEvents } from '../constants'

// TODO: event time
export default {
  components: {
    EventsCalendar,
    AddEventModal
  },

  data () {
    return {
      deleteEventDialog: false,
      addEventDialog: false,
      groups: groups,
      colors: colors,
      typesEvents: typesEvents,
      deletedEventId: null
    }
  },

  computed: {
    events () {
      return this.$store.getters.events
    }
  },

  methods: {
    deleteModalHandler (id) {
      this.deleteEventDialog = true
      this.deletedEventId = id
    },
    deleteEvent () {
      this.deleteEventDialog = false
      this.$store.commit('deleteEvent', this.deletedEventId)
    },
    updateEvent (event) {
      this.$store.commit('updateEvent', event)
    },
    addEvent (event) {
      this.addEventDialog = false
      this.$store.commit('addEvent', event)
    }
  }
}
</script>
