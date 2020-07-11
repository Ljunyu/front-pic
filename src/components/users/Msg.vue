<template>
  <div class="fly-panel fly-panel-user" pad20>
    <div class="layui-tab layui-tab-brief" lay-filter="user" id="LAY_msg" style="margin-top: 15px;">
      <button class="layui-btn layui-btn-danger" id="LAY_delallmsg" @click="clearAll()">清空全部消息</button>
      <div id="LAY_minemsg" style="margin-top: 10px;">
        <!--<div class="fly-none">您暂时没有最新消息</div>-->
        <ul class="mine-msg">
          <li v-for="(item,index) in lists" :key="'comments' + index">
            <blockquote class="layui-elem-quote">
              <a href="/jump?username=Absolutely" target="_blank">
                <cite>{{item.cuid.name}}</cite>
              </a>回答了您的求解
              <a target="_blank" href="/jie/8153.html/page/0/#item-1489505778669">
                <cite>{{item.title}}</cite>
              </a>
            </blockquote>
            <div v-richtext="item.content"></div>
            <p>
              <span>{{ item.created | moment}}</span>
              <a
                href="javascript:;"
                class="layui-btn layui-btn-small layui-btn-danger fly-delete"
                @click="clear(item)"
              >删除</a>
            </p>
          </li>
        </ul>
        <imooc-page
          v-show="total > 0"
          :total="total"
          :current="page"
          :align="'left'"
          :hasTotal="true"
          :hasSelect="true"
          @changeCurrent="handleChange"
        ></imooc-page>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getMsg } from '@/api/user'
import Pagination from '../moudl/page/index'
export default {
  name: 'user-msg',
  components: {
    'imooc-page': Pagination
  },
  data () {
    return {
      lists: [],
      page: 0,
      limit: 10,
      total: 0,
      ws: {}
    }
  },
  mounted () {
    this.getMsgAll()
    // this.init()
  },
  computed: mapState({
    num: (state) => (state.num.message ? state.num.message : 0)
  }),
  methods: {
    //         send () {
    //             this.list.push({ name: this.name, extend: 'msg', msg: this.inputvalue })
    //             this.ws.send(JSON.stringify({ name: this.name, extend: 'msg', msg: this.inputvalue }))
    //             this.inputvalue = ''
    //         },
    //         deled () {
    //             this.ws.close()
    //         },
    //         onopen () {
    //              console.log('111连接', this.ws.readyState)
    //              this.ws.send(JSON.stringify({ extend: 'auth', message: 'Bearer ' + this.$store.state.token }))
    //          },
    //         onmessage (extend) {
    //             if (this.isshow) {
    //                 return
    //             }
    //             var jsonmsg = JSON.parse(extend.data)
    //             this.number = jsonmsg.num
    //             switch (jsonmsg.extend) {
    //                     case 'noauth':
    //                        // 路由跳转到登录页面
    //                     break
    //                     case 'enter':
    //                         this.list.push({ name: '系统', msg: '欢迎' + jsonmsg.name + '进入聊天室' })
    //                     break
    //                     case 'out':
    //                         this.list.push({ name: '系统', msg: '用户' + jsonmsg.name + '退出聊天室' })
    //                     break
    //                     case 'heartbeast':
    //                         this.checkout()
    //                         this.ws.send(JSON.stringify({ extend: 'heartbeast', message: 'pong' }))
    //                     break
    //                 default:
    //                     if (jsonmsg.name !== this.name) {
    //                         this.list.push({ name: jsonmsg.name, msg: jsonmsg.msg })
    //                     }
    //                     break
    //             }
    //         },
    //         onclose () {
    //             this.ws.close()
    //             console.log('已经关闭连接', this.ws.readyState)
    //         },
    //         onerror () {
    //             setTimeout(function () {
    //                 this.init()
    //             }, 20000)
    //             console.log(1121313, this.ws.readyState)
    //         },
    //   init () {
    //     // ${this.protocol}://${this.url}:${this.port}
    //    this.ws = new WebSocket('ws://127.0.0.1:3001')
    //             this.ws.onopen = this.onopen
    //             this.ws.onmessage = this.onmessage
    //             this.ws.onclose = this.onclose
    //             this.ws.onerror = this.onerror
    // },
    clearAll () {
      // setMsg().then((res) => {
      //   if (res.code === 200) {
      //     // 清空所有消息
      //     this.lists = []
      //     this.$store.commit('setMessage', { message: 0 })
      //     this.total = 0
      //   }
      // })
    },
    clear (item) {
      // setMsg({ id: item._id }).then((res) => {
      //   if (res.code === 200) {
      //     // 设置特定消息已读
      //     // this.lists = []
      //     this.getMsgAll()
      //     this.$store.commit('setMessage', { message: this.num - 1 })
      //   }
      // })
    },
    getMsgAll () {
      getMsg({
        page: this.page,
        limit: this.limit
      }).then((res) => {
        if (res.code === 200) {
          this.lists = res.data
          // this.total = res.total
        }
      })
    },
    handleChange (val) {
      this.page = val
      this.getMsgAll()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
