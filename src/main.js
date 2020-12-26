import Vue from 'vue'
import App from './App.vue'
import api from './api'
import axios from 'axios'
import ElementUI from 'element-ui'

Object.defineProperty(Vue.prototype, '$api', { value: api })
Vue.use(ElementUI, {
  size: 'small',
})
axios.defaults.baseURL = 'http://localhost:3000'
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')