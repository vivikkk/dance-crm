import Vue from 'vue'
import Vuex from 'vuex'

import students from './modules/students'
import events from './modules/events'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,

  modules: {
    students,
    events
  }
})
