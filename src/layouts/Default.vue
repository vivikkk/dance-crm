<template lang="pug">
v-app
  v-navigation-drawer(
    app temporary
    v-model="drawer"
  )
    v-list
      v-list-item(
        v-for="link of links"
        :key="link.title"
        :to="link.url"
        @click=""
      )
        v-list-item-icon
          v-icon {{ link.icon }}
        v-list-item-content
          v-list-item-title(v-text="link.title")
      v-list-item(
        @click="logout"
      )
        v-list-item-icon
          v-icon mdi-exit
        v-list-item-content
          v-list-item-title Выйти

  div
    v-toolbar(dark flat color="primary")
      v-app-bar-nav-icon.hidden-md-and-up(
        @click="drawer = !drawer"
      )
      v-toolbar-title
        router-link(to="/" tag="span" class="cursor") DanceCrm

      v-spacer

      v-toolbar-items.hidden-sm-and-down
        v-btn(
          text
          v-for="link of links"
          :key="link.title"
          :to="link.url"
        )
          v-icon(left) {{ link.icon }}
          span {{ link.title }}
        v-btn(
          text
          @click="logout"
        )
          v-icon(left) mdi-logout
          span Выйти

  v-content
    slot
</template>

<script>
export default {
  name: 'DefaultLayout',

  data () {
    return {
      drawer: false,
      links: [
        { title: 'Посещаемость', icon: 'mdi-clipboard-list-outline', url: '/attendance' },
        { title: 'События', icon: 'mdi-calendar', url: '/events' },
        { title: 'Ученики', icon: 'mdi-face', url: '/students' }
      ]
    }
  },

  methods: {
    async logout () {
      await this.$store.dispatch('logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style>
.cursor{
  cursor: pointer;
}
</style>
