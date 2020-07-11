<template>
    <div class="content">
        <div class="flex">
            <div>
                <span>确定修改为{{username}}吗？</span>
            </div>
            <div>
            <button @click="sumbit()" type="button" :class="{'layui-btn-disabled':issend}" class="layui-btn">确认修改</button>
            <router-link to='/' ><button type="button" class="layui-btn">返回首页</button></router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { updatename } from '../api/user'

let obj = {}
export default {
  name: 'confirm',
  data () {
    return {
      username: '',
      issend: false
    }
  },
  mounted () {
    const querstr = window.location.href.replace(/.*\?/, '')
    // console.log(querstr.split('&').map(v =>
    //   v.split('=')))
    obj = Object.fromEntries(querstr.split('&').map(v =>
      v.split('=')))
    console.log(111222, obj)
    this.username = decodeURIComponent(obj.username)
  },
  methods: {
    sumbit () {
      console.log(obj.key)
      obj.username = this.username
      updatename({ key: obj.key, username: this.username }).then((res) => {
        if (res.code === 200) {
          this.issend = true
          this.$alert('已更新，请重新登录')
          localStorage.clear('userinfo')
          this.$$store.commit('setuserinfo', '')
          setTimeout(() => {
            this.$router.push('/login')
          }, 2000)
        }
        console.log(res)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.content{
    width: 100%;
    height: 200px;
    position: fixed;
    top: 50%;
    left: 0;
}
    .flex{
        display: flex;
        height: 30px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .layui-btn{
        margin: 10px;
    }
</style>>
