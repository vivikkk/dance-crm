<template lang="pug">
v-container(
  class="fill-height" fluid
)
  v-row(
    align="center"
    justify="center"
  )
    v-col(
      cols="12" sm="8" md="6" lg="4"
    )
      v-card
        v-toolbar(
          dark flat color="primary"
        )
          v-toolbar-title Форма входа
        v-card-text
          v-form
            v-text-field(
              label="Почта"
              name="email"
              v-model.trim="email"
              prepend-icon="mdi-email"
              type="email"
            )
            v-text-field(
              label="Пароль"
              name="password"
              v-model.trim="password"
              prepend-icon="mdi-lock"
              type="password"
            )
        v-card-actions
          v-spacer
          v-btn(
            text color="primary"
            @click="onSubmit"
          ) Войти
</template>

<script>
export default {
  name: 'Login',

  data () {
    return {
      valid: false,
      email: null,
      password: null
    }
  },

  methods: {
    async onSubmit () {
      const loginForm = {
        email: this.email,
        password: this.password
      }

      try {
        await this.$store.dispatch('login', loginForm)
        this.$router.push('/')
        this.$store.dispatch('fetchAllData')
      } catch (error) {}
    }
  }
}
</script>
