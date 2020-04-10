import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../src/util/veevalidate'
import alert from './components/moudl/alerts/alert.js'
import intance from './components/moudl/toast/toast.js'
Vue.config.productionTip = false
Vue.use(alert)
Vue.use(intance)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
