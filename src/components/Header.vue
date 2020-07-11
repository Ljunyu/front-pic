<template>
  <div class="fly-header layui-bg-black">

    <div class="layui-container">
      <a class="fly-logo" href="/">
        <img src="../assets/logo-2.png" alt="layui" />
      </a>
      <ul class="layui-nav fly-nav layui-hide-xs">
        <li class="layui-nav-item layui-this">
          <a href="/">
            <i class="iconfont icon-jiaoliu"></i>

    交流
          </a>
        </li>
        <li class="layui-nav-item">
          <a href="case/case.html">
            <i class="iconfont icon-iconmingxinganli"></i>案例
          </a>
        </li>
        <li class="layui-nav-item">
          <a href="http://www.layui.com/" target="_blank">
            <i class="iconfont icon-ui"></i>框架
          </a>
        </li>
      </ul>

      <ul class="layui-nav fly-nav-user">
        <!-- 未登入的状态 -->
        <template v-if="isshow==false">
          <li class="layui-nav-item">
            <a class="iconfont icon-touxiang layui-hide-xs" href="../user/login.html"></a>
          </li>
          <li class="layui-nav-item">
            <router-link :to="{name:'login'}">登入</router-link>
          </li>
          <li class="layui-nav-item">
            <router-link :to="{name:'reg'}">注册</router-link>
          </li>
          <li class="layui-nav-item layui-hide-xs">
            <a
              href
              onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})"
              title="QQ登入"
              class="iconfont icon-qq"
            ></a>
          </li>
          <li class="layui-nav-item layui-hide-xs">
            <a
              href
              onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})"
              title="微博登入"
              class="iconfont icon-weibo"
            ></a>
          </li>
        </template>
        <!-- 登入后的状态 -->
        <template v-else>
        <li class="layui-nav-item" @mouseover="sethover()" @mouseleave="downhover()">
          <a class="fly-nav-avatar">
            <cite class="layui-hide-xs">{{userinfo.name}}</cite>
            <i class="iconfont icon-renzheng layui-hide-xs" ></i>
              <i v-show="userinfo.isvip!==0" class="layui-badge fly-badge-vip layui-hide-xs">{{'VIP'+userinfo.isvip}}</i>
            <img :src="pic">
          </a>
          <dl class="layui-nav-child layui-anim layui-anim-upbit" :class="{'layui-show':ishover}" >
            <dd><router-link :to="{name:'myinfo'}"><i class="layui-icon">&#xe620;</i>基本设置</router-link></dd>
             <dd><router-link :to="{name:'usermsg'}"><i class="iconfont icon-tongzhi" style="top: 4px;"></i>我的消息</router-link></dd>
            <dd><a href="user/home.html"><i class="layui-icon" style="margin-left: 2px; font-size: 22px;">&#xe68e;</i>我的主页</a></dd>
            <dd><a @click='lagout()' style="text-align: center;">退出</a></dd>
          </dl>
        </li>
        <div class="fly-nav-msg">
              {{num}}
        </div>
          <transition  name='fade'>
               <div v-show="hasmsg" class="layui-layer-tips">
                <div class="layui-layer-content">
                  您有{{num}}条未读消息
                  <i class="layui-layer-TipsG layui-layer-TipsB" ></i>
                </div>
              </div>
          </transition>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Header',
  data () {
    return {
      hasmsg: false,
      ishover: false,
      timehover: {},
      pic: this.$store.state.userinfo && this.$store.state.userinfo.pic ? this.$store.state.userinfo.pic : 'https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg'
    }
  },
  methods: {
    sethover () {
      clearTimeout(this.timehover)
      this.timehover = setTimeout(() => {
        this.ishover = true
      }, 200)
    },
    downhover () {
      clearTimeout(this.timehover)
      this.timehover = setTimeout(() => {
        this.ishover = false
      }, 400)
    },
    lagout () {
      localStorage.clear()
      this.$store.commit('setuserinfo', '')
      this.$store.commit('setToken', '')
      this.$router.push('/')
    }
  },
  watch: {
    num (old, news) {
      if (old !== news) {
        this.hasmsg = true
        setTimeout(() => {
          this.hasmsg = false
        }, 2000)
      }
    }
  },
  computed: {
   ...mapState({
        num: state => state.num
   }),
    isshow () {
      return this.$store.state.islogin
    },
    userinfo () {
      return this.$store.state.userinfo
    }
  }
}
</script>

<style lang="scss" scoped>
.layui-layer-tips{
  position: fixed;
  white-space: nowrap;
  top: 60px;
  right: 10px;
  z-index: 2000;
}
.fly-logo {
  left: -15px;
  top: -10px;
  margin-left: 15px;
}
</style>
