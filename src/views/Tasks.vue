<template lang="pug">
v-container
  v-row(
    align="center"
    justify="center"
  )
    v-col(
      cols="12"
      lg="8"
    )
      h1.display-2 Задачи

  v-btn(
    class="btn" color="blue" fab large
    bottom fixed right
    @click="addEventDialog = true"
  )
    v-icon(color="white") mdi-calendar-check
</template>

<script>
// Кто и что должен сделать
// Прикрепление картинок, документов и прочего
</script>
