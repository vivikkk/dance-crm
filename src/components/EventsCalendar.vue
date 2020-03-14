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
            v-card-actions
              v-spacer
              v-btn(text color="secondary" @click="selectedOpen = false") Отмена
              v-btn(text color="green" @click="") Сохранить
</template>

<script>
export default {
  name: 'EventsCalendar',

  data () {
    return {}
  }
}
</script>
