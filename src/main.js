import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../src/util/veevalidate'
import alert from './components/moudl/alerts/alert.js'
import intance from './components/moudl/toast/toast.js'
import anmated from 'animate.css'
import filters from './util/filter'
import directives from './util/directives'
Vue.config.productionTip = false
Object.keys(filters).forEach((key) => [
  Vue.filter(key, filters[key])
])
Object.keys(directives).map((key) => {
  console.log('key', key, directives, directives[key])
  Vue.directive(key, directives[key])
})
Vue.use(alert)
Vue.use(intance)
Vue.use(anmated)
new Vue({
  router,
  store,
  render: h => h(App)

}).$mount('#app')
