<template lang="pug">
div
  v-card-text <strong>{{ studentName }}</strong> будет удалена из списка учеников. <br>Вы уверены?
    v-card-actions
      v-spacer
      v-btn(
        text
      ) Отмена
      v-btn(
        color="red"
        text
      ) Удалить
</template>

<script>
export default {
  name: 'Delete Modal',

  props: {
    studentName: {
      type: String,
      required: true
    }
  }
}
</script>
