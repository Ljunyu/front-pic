import instanc from './alert.vue'
const intensd = {}
intensd.install = (Vue) => {
  const Allercoment = Vue.extend(instanc)
  const inslo = new Allercoment()
  inslo.$mount(document.createElement('div'))
  document.body.appendChild(inslo.$el)
  Vue.prototype.$alert = (msg) => {
    inslo.msg = msg
    inslo.isshow = true
    inslo.type = 'alert'
  }
  Vue.prototype.$confirm = (msg, success, cancel) => {
    if (typeof success !== 'undefined') {
      inslo.success = success
    }
    if (typeof cancel !== 'undefined') {
      inslo.cancel = cancel
    }
    inslo.type = 'confirm'
    inslo.msg = msg
    inslo.isshow = true
  }
}
export default intensd
