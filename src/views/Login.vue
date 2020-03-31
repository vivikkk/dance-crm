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
          v-form(
            v-model="valid"
            ref="form"
            lazy-validation
          )
            v-text-field(
              label="Почта"
              name="email"
              v-model.trim="email"
              prepend-icon="mdi-email"
              type="email"
              :rules="emailRules"
            )
            v-text-field(
              label="Пароль"
              name="password"
              v-model.trim="password"
              prepend-icon="mdi-lock"
              type="password"
              :rules="passwordRules"
            )
        v-card-actions
          v-spacer
          v-btn(
            text color="primary"
            :loading="loading"
            :disabled="!valid"
            @click="onSubmit"
          ) Войти
</template>

<script>
const emailRegex = /^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/

export default {
  name: 'Login',

  data () {
    return {
      loading: false,
      email: null,
      password: null,
      valid: false,
      emailRules: [
        v => !!v || 'Обязательное поле',
        v => emailRegex.test(v) || 'Невалидная почта'
      ],
      passwordRules: [
        v => !!v || 'Обязательное поле'
      ]
    }
  },

  methods: {
    async onSubmit () {
      if (this.$refs.form.validate()) {
        const loginForm = {
          email: this.email,
          password: this.password
        }

        this.loading = true
        await this.$store.dispatch('login', loginForm)
        this.$router.push('/')
      }
    }
  }
}
</script>
