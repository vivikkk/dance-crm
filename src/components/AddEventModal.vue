<template lang="pug">
v-card
  v-toolbar(
    dark
    :color="getEventColor"
  )
    v-toolbar-title Добавить новое событие

  v-card-text(
    class="mt-4"
  )
    v-form(
      v-model="valid"
      ref="form"
      lazy-validation
    )
      v-select(
        label="Тип события"
        v-model="event.name"
        :disabled="isSimpleLesson"
        :rules="[() => !!event.name || 'Обязательное поле']"
        :items="typesEvents"
      )
      v-select(
        label="Группа"
        v-model="event.group"
        multiple
        :items="groups"
        :rules="[() => !!event.group.length || 'Обязательное поле']"
      )
      v-text-field(
        label="Дополнительно"
        v-model="event.description"
      )
      v-menu(
        ref="startTimeMenu"
        v-model="startTimeMenu"
        :close-on-content-click="false"
        :return-value.sync="event.start"
        transition="scale-transition"
        offset-y
        min-width="290px"
      )
        template(
          #activator="{ on }"
        )
          v-text-field(
            v-model="event.start"
            label="Начало события"
            prepend-icon="mdi-calendar"
            readonly
            v-on="on"
            :rules="[() => !!event.start || 'Обязательное поле']"
          )
        v-date-picker(
          no-title scrollable
          v-model="event.start"
        )
          v-spacer
          v-btn(
            text color="primary"
            @click="startTimeMenu = false"
          ) Отмена
          v-btn(
            text color="primary"
            @click="$refs.startTimeMenu.save(event.start)"
          ) Ок

    v-menu(
      v-if="!isSimpleLesson"
      ref="endTimeMenu"
      v-model="endTimeMenu"
      :close-on-content-click="false"
      :return-value.sync="event.end"
      transition="scale-transition"
      offset-y
      min-width="290px"
    )
      template(
        #activator="{ on }"
      )
        v-text-field(
          v-model="event.end"
          label="Конец события"
          prepend-icon="mdi-calendar"
          readonly
          v-on="on"
          clearable
          @click:clear="event.end = null"
        )
      v-date-picker(
        no-title scrollable
        v-model="event.end"
      )
        v-spacer
        v-btn(
          text color="primary"
          @click="endTimeMenu = false"
        ) Отмена
        v-btn(
          text color="primary"
          @click="$refs.endTimeMenu.save(event.end)"
        ) Ок

  v-card-actions
    v-spacer
    v-btn(
      text
      @click="$emit('cancel')"
    ) Отмена
    v-btn(
      :disabled="!valid"
      text color="green"
      @click="onSubmit"
    ) Добавить
</template>

<script>
export default {
  name: 'AddEventModal',

  props: {
    isSimpleLesson: {
      type: Boolean,
      required: false
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
      startTimeMenu: false,
      endTimeMenu: false,
      valid: false,
      event: {
        id: '',
        name: '',
        start: '',
        end: '',
        description: '',
        group: []
      }
    }
  },

  mounted () {
    if (this.isSimpleLesson) {
      this.event.name = 'Занятие'
    }
  },

  computed: {
    getEventColor () {
      const eventIndex = this.typesEvents.indexOf(this.event.name)

      return this.colors[eventIndex]
    }
  },

  methods: {
    onSubmit () {
      if (this.$refs.form.validate()) {
        this.$emit('add', this.event)
      }
    }
  }
}
</script>
