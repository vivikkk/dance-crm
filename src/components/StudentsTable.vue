<template lang="pug">
  v-card
    v-card-title
      v-text-field(
        v-model="search"
        prepend-inner-icon="mdi-account-search"
        label="Поиск"
        single-line
        hide-details
      )

    v-data-table(
      :headers="headers"
      :fixed-header="true"
      :items="students"
      align="start"
    )
      template(#item.name="{ value }")
        strong {{ value }}

      template(#item.dateOfBirthday="{ value }")
        div {{ value }}

      template(#item.parents="{ value }")
        .mt-2.mb-2(
          v-for="(val, key) in value"
          v-if="val"
        )
          strong.mr-1 {{ getGlobalVars(key) }}:
          span {{ val }}

      template(#item.phones="{ value }")
        .mt-2.mb-2(
          v-for="(val, key) in value"
          v-if="val"
        )
          strong.mr-1 {{ getGlobalVars(key) }}:
          a(:href="`callto:${val}`") {{ val }}

      template(#item.school="{ value }")
        span {{ value }}

      template(#item.classStudy="{ value }")
        span {{ value }}

      template(#item.adress="{ value }")
        .mt-2.mb-2(
          v-for="(val, key) in value"
          v-if="val"
        )
          strong.mr-1 {{ getGlobalVars(key) }}:
          span {{ val }}

      template(#item.group="{ value }")
        div {{ value }}

      template(#item.action="{ item }")
        v-icon(
          medium
          class="mr-2"
          @click="editItem(item)"
        ) mdi-pencil
        v-icon(
          medium
          @click="deleteItem(item)"
        ) mdi-delete
</template>

<script>
import constans from '../constants'

export default {
  name: 'StudentsTable',

  props: {
    students: {
      type: Array,
      required: true
    },
    headers: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      search: ''
    }
  },

  methods: {
    getGlobalVars (key) {
      return constans[key]
    },
    editItem (item) {
      this.$emit('edit', item)
    },
    deleteItem (item) {
      this.$emit('delete', item)
    }
  }
}
</script>

<style>
span {
  white-space: nowrap;
}
</style>
