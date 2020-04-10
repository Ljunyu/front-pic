import moban from './toast.vue'
let intance = {}
intance.install = (Vue) => {
  const newintance = Vue.extend(moban)
  // eslint-disable-next-line new-cap
  const newintances = new newintance()
  newintances.$mount(document.createElement('div'))
  document.body.appendChild(newintances.$el)
  Vue.prototype.$toast = (msg) => {
    newintances.msg = msg
    setTimeout(() => {
      document.body.removeChild(newintances.$el)
    }, 1000)
  }
}
export default intance
