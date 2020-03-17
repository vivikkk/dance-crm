import Vue from 'vue'
import VueFilterDateFormat from 'vue-filter-date-format'
import VueFilterDateParse from 'vue-filter-date-parse'
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

Vue.use(VueFilterDateParse)
Vue.use(VueFilterDateFormat, {
  dayOfWeekNames: [
    'Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг',
    'Пятница', 'Суббота'
  ],
  dayOfWeekNamesShort: [
    'Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'
  ],
  monthNames: [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ],
  monthNamesShort: [
    'Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн',
    'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'
  ]
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
