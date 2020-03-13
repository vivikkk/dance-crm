<template lang="pug">
v-app
  v-navigation-drawer(
    app
    temporary
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

  div
    v-toolbar(dark flat color="primary")
      v-app-bar-nav-icon.hidden-md-and-up(
        @click="drawer = !drawer"
      )
      v-toolbar-title
        router-link(to="/" tag="span") DanceCrm

      v-spacer

      v-toolbar-items.hidden-sm-and-down
        v-btn(
          text
          v-for="link of links"
          :key="link.title"
          :to="link.url"
        )
          v-icon(left) {{link.icon}}
          span {{link.title}}

  v-content
    slot
</template>

<script>
export default {
  name: 'DefaultLayout',

  data: () => ({
    drawer: false,
    links: [
      { title: 'События', icon: 'mdi-calendar', url: '/events' },
      { title: 'Ученики', icon: 'mdi-face', url: '/students' }
    ]
  })
}
</script>
