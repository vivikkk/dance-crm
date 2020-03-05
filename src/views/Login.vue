<template lang="pug">
  v-container(
    class="fill-height"
    fluid
  )
    v-row(
      align="center"
      justify="center"
    )
      v-col(
        cols="12"
        sm="8"
        md="6"
      )
        v-card
          v-toolbar(
            dark
            flat
            color="primary"
          )
            v-toolbar-title Форма входа

          v-card-text
            v-form
              v-text-field(
                label="Почта"
                name="email"
                prepend-icon="mdi-email"
                type="email"
              )
              v-text-field(
                label="Пароль"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
              )
          v-card-actions
            v-spacer
            v-btn(
              text
              color="primary"
            ) Войти
</template>

<script>
export default {
  name: 'Login'
}
</script>
