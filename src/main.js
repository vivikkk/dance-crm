import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import Simple from './layouts/Simple'
import Default from './layouts/Default'

Vue.component('default-layout', Default)
Vue.component('simple-layout', Simple)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
