import store from '../store'
class WebSockets {
    constructor (config = {}) {
        const defautConfig = {
            url: '106.13.53.240',
            port: '3001',
            protocol: 'ws'
        }
    this.ws = {}
    const finalConfig = { ...defautConfig, ...config }
    this.port = finalConfig.port
    this.url = finalConfig.url
    this.protocol = finalConfig.protocol
    }

    send (msg) {
          this.ws.send(JSON.stringify(msg))
     }

    init () {
        console.log(123321)
        this.ws = new WebSocket(`${this.protocol}://${this.url}:${this.port}`)
        this.ws.onopen = this.onopen
        this.ws.onmessage = this.onmessage
        this.ws.onclose = this.onclose
        this.ws.onerror = this.onerror
    }

    onopen () {
        console.log('111连接')
        this.send(JSON.stringify({
            extend: 'auth', message: 'Bearer ' + store.state.token
        }))
    }

    onmessage (event) {
       if (this.isshow) {
           return
       }
       var obj = JSON.parse(event.data)
       console.log(obj)
       switch (obj.event) {
               case 'noauth':
                  // 路由跳转到登录页面
                  this.$router.push({ name: 'login' })
               break
               case 'heartbeat':
                   this.ws.send(JSON.stringify({ extend: 'heartbeat', message: 'pong' }))
               break
           default:
                store.dispatch(obj.event, obj)
       }
   }

   onerror () {
    console.log('已经关闭连接', this.ws.readyState)
       this.ws.close()
   }

   onError () {
       setTimeout(function () {
           this.init()
       }, 2000)
       console.log(11111, this.ws.readyState)
   }
}
export default WebSockets
