<template lang="pug">
v-card
  v-card-title(class="headline") Внимание!
  v-card-text <strong> {{ student.name }}</strong> будет удалена из списка учеников.
  v-card-actions
    v-spacer
    v-btn(
      text
      @click="$emit('cancel')"
    ) Отмена
    v-btn(
      text color="red"
      @click="$emit('delete')"
    ) Удалить
</template>

<script>
export default {
  name: 'DeleteModal',

  props: {
    student: {
      type: Object,
      required: true
    }
  }
}
</script>
