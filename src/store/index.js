import Vue from 'vue'
import Vuex from 'vuex'

import common from './modules/common'
import students from './modules/students'
import events from './modules/events'
import attendance from './modules/attendance'
import auth from './modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,

  modules: {
    auth,
    students,
    events,
    common,
    attendance
  }
})
