<template>
      <div class="fly-panel fly-signin">
        <div class="fly-panel-title">
          签到
          <i class="fly-mid"></i>
          <a href="javascript:;" class="fly-link" id="LAY_signinHelp">说明</a>
          <i class="fly-mid"></i>
          <a href="javascript:;" class="fly-link" id="LAY_signinTop">活跃榜<span class="layui-badge-dot"></span></a>
          <span class="fly-signin-days">已连续签到<cite>{{count}}</cite>天</span>
        </div>
        <div class="fly-panel-main fly-signin-main">
          <template v-if='issign==false'>
              <button class="layui-btn layui-btn-danger" id="LAY_signin" @click="tabsign()">今日签到</button>
            <span>可获得<cite>{{favs}}</cite>飞吻</span>
          </template>

          <!-- 已签到状态 -->
          <template v-else>
           <button class="layui-btn layui-btn-disabled">今日已签到</button>
          <span>获得了<cite>{{favs}}</cite>飞吻</span>
          </template>

        </div>
      </div>
</template>

<script>
import { usersign } from '../../api/user'
export default {
  name: 'sign',
  data () {
    return {
      issign: this.$store.state.userinfo.issign
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      if (this.$store.state.islogin === false) {
        this.issign = false
      }
    },
    tabsign () {
      if (this.$store.state.islogin === false) {
        this.$alert('请先登录')
        return
      }
      usersign().then((res) => {
        if (res.code === 200) {
          this.issign = true
          const userinfo = this.$store.state.userinfo
          userinfo.issign = true
          userinfo.count = res.count
          userinfo.favs = res.favs
          this.$store.commit('setuserinfo', userinfo)
          this.$alert('签到成功')
        }
      })
    }
  },
  computed: {
    favs () {
      const count = parseInt(this.count)
      let result = 0
      if (count < 5) {
        result = 5
      } else if (count >= 5 && count <= 15) {
        result = 10
      } else if (count >= 15 && count <= 30) {
        result = 15
      } else if (count >= 30 && count <= 100) {
        result = 20
      } else if (count >= 365) {
        result = 30
      }
      return result
    },
    count () {
      if (this.$store.state.userinfo !== '') {
        if (typeof this.$store.state.userinfo.count !== 'undefined') {
          return this.$store.state.userinfo.count
        } else {
          return 0
        }
      } else {
        return 0
      }
    }
  }
}
</script>

<style>

</style>
