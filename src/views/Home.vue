<template lang="pug">
v-container
  v-row
    v-col(cols="12" lg="8")
      v-data-iterator(
        :items="items"
        :items-per-page.sync="itemsPerPage"
        hide-default-footer
      )
        template(#header)
          v-toolbar(
            class="mb-2" dark
            color="primary"
          )
            v-toolbar-title Посещаемость
        template(
          #default="props"
        )
          v-row
            v-col(
              v-for="item in props.items"
              :key="item.name"
              cols="12"
              lg="3"
            )
              v-card
                v-card-title(class="subheading font-weight-bold") {{ item.date }}
                v-divider
                v-list(dense)
                  v-list-item
                    v-list-item-content Группа:
                    v-list-item-content(class="align-end")
                  v-list-item
                    v-list-item-content Отсутствовали:
                    v-list-item-content(class="align-end")

      //- Кто отсутсвовал в таблице на последнем занятии
      //- Ближайшее ДР
</template>

<script>
export default {
  name: 'Home',

  data () {
    return {
      itemsPerPage: 4,
      items: [
        {
          date: 'Март 14'
        },
        {
          date: 'Март 10'
        },
        {
          date: 'Март 7'
        }
      ]
    }
  }
}
</script>
