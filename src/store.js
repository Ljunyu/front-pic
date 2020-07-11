import Vue from 'vue'
import Vuex from 'vuex'
import WebsocketClint from './util/websocket'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    uuid: '',
    token: '',
    islogin: false,
    userinfo: '',
    detail: '',
    ws: null,
    num: '' // websocket传入 有几条未读消息
  },
  mutations: {
    initWebsocket (state, config) {
      console.log(123345)
      state.ws = new WebsocketClint(config)
      state.ws.init()
    },
    setuuid (state, value) {
      state.uuid = value
    },
    setToken (state, ctx) {
      state.token = ctx
      localStorage.setItem('token', ctx)
    },
    setuserinfo (state, info) {
      console.log(121121, info)
      if (info === '') {
        state.islogin = false
      } else {
        state.userinfo = info
        state.islogin = true
        localStorage.setItem('userinfo', JSON.stringify(info))
        console.log(4444, localStorage.getItem('userinfo'))
      }
    },
    setbasciinfo (state, info) {

    },
    setMessage (state, value) {
      state.num = value.number ? value.number : 0
        console.log(112112, value)
    }
  },
  actions: {
    massage ({ commit }, msg) {
      commit('setMessage', msg)
    }
  }
})
