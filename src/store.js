import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    uuid: '',
    islogin: false
  },
  mutations: {
    setuuid (state, value) {
      state.uuid = value
    }
  },
  actions: {

  }
})
