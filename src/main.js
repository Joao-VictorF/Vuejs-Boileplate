import App from './App'
import Vue from 'vue'
import Cookies from 'js-cookie'
import Element from 'element-ui'
import enLang from 'element-ui/lib/locale/lang/en'
import store from './store'
import router from './router'
import * as filters from './filters' // global filters
import vuetify from './plugins/vuetify'
import VCurrencyField from 'v-currency-field'
import AOS from 'aos'
import VCalendar from 'v-calendar'
import { VueMaskDirective } from 'v-mask'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import './styles/element-variables.scss'
import '@/styles/index.scss' // global css
import './permission' // permission control
import 'aos/dist/aos.css'

Vue.directive('mask', VueMaskDirective)

Vue.use(VCurrencyField, {
  locale: 'pt-BR',
  decimalLength: 2,
  autoDecimalMode: true,
  min: null,
  max: null,
  defaultValue: 0,
  valueAsInteger: false,
  allowNegative: false
})

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  locale: enLang
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

Vue.use(VCalendar, {
  componentPrefix: 'vc' // Use <vc-calendar /> instead of <v-calendar />
})

new Vue({
  el: '#app',
  router,
  store,
  vuetify,
  created() {
    AOS.init()
  },
  render: h => h(App)
})
