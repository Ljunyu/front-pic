<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li class="layui-this">登入</li>
          <li>
            <router-link :to="{name: 'reg'}">注册</router-link>
          </li>
        </ul>
        <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
          <div class="layui-tab-item layui-show">
            <div class="layui-form layui-form-pane">
              <validation-observer ref="observer" v-slot="{ validate }" >
                <div class="layui-form-item">
                  <label for="L_email" class="layui-form-label">用户名</label>
                  <ValidationProvider  rules="required|email" v-slot="{errors}">
                  <div class="layui-input-inline">
                    <input
                      type="text"
                      name="username"
                      v-model="username"
                      placeholder="请输入用户名"
                      autocomplete="off"
                      class="layui-input"
                    />
                  </div>
                  <div class="layui-form-mid">
                    <span style="color: #c00;">{{errors[0]}}</span>
                  </div>
                  </ValidationProvider >
                </div>
                <div class="layui-form-item">
                  <label for="L_pass" class="layui-form-label">密码</label>
                  <validation-provider rules="required|min:6|max:16" v-slot="{errors}">
                    <div class="layui-input-inline">
                      <input
                        type="password"
                        name="password"
                        v-model="password"
                        placeholder="请输入密码"
                        autocomplete="off"
                        class="layui-input"
                      />
                    </div>
                    <div class="layui-form-mid">
                      <span style="color: #c00;">{{errors[0]}}</span>
                    </div>
                   </validation-provider>
                </div>
                <div class="layui-form-item">
                  <div class="layui-row">
                    <label for="L_vercode" class="layui-form-label">验证码</label>
                     <div class="layui-input-inline">
                      <input
                        type="text"
                        name="code"
                        v-model="code"
                        placeholder="请输入验证码"
                        autocomplete="off"
                        class="layui-input"
                      />
                    </div>
                    <div class>
                      <span class="svg" style="color: #c00;" @click="_getCode()" v-html="svg"></span>
                    </div>
                  </div>
                  <div class="layui-form-mid">
                    <span style="color: #c00;"></span>
                  </div>
                </div>
                <div class="layui-form-item">
                  <button class="layui-btn"  type="button" @click="validate().then(sumbit)" >立即登录</button>
                  <span style="padding-left:20px;">
                    <router-link :to="{name: 'forget'}">忘记密码？</router-link>
                  </span>
                </div>
                <div class="layui-form-item fly-form-app">
                  <span>或者使用社交账号登入</span>
                  <a
                    href
                    onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})"
                    class="iconfont icon-qq"
                    title="QQ登入"
                  ></a>
                  <span
                    class="iconfont icon-weibo"
                    title="微博登入"
                    @click="cs()"
                  ></span>
                </div>
              </validation-observer>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getCode, login, gitcs } from '../api/login'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { v4 as uuidv4 } from 'uuid'
export default {
  name: 'login',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      username: '',
      password: '',
      code: '',
      svg: ''
    }
  },
  mounted () {
    window.vue = this
    let sid = ''
    if (localStorage.getItem('sid') != null) {
      this.$store.state.uuid = localStorage.getItem('sid')
    } else {
      sid = uuidv4()
      localStorage.setItem('sid', sid)
      this.$store.state.uuid = sid
    }
    this._getCode()
  },
  methods: {
    cs () {
      gitcs({ body: 1111 }).then(res => {
        console.log(111, res)
      })
    },
    _getCode () {
      console.log(this.$store.state.uuid)
      getCode(this.$store.state.uuid).then((res) => {
        if (res.code === 200) {
          this.svg = res.data
        }
      })
    },
    async sumbit () {
      const isValid = await this.$refs.observer.validate()
      console.log(isValid)
      if (!isValid) {
        return
      }
      const params = {
        username: this.username,
        password: this.password,
        code: this.code,
        uuid: this.$store.state.uuid
      }
      console.log(params)
      login(params).then((res) => {
        console.log(3333, res, res.data, res.code === 200)
        if (res.code === 200) {
          this.$store.commit('setuserinfo', res.data)
          this.$store.commit('setToken', res.token)
          this.$router.push({ name: 'Index' })
        }
      }).catch((err) => {
        console.log(11111222, err)
        if (err.response.data.code === 500) {
          this.$alert('用户名或密码校验失败')
        } else {
          this.$alert('服务器错误')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
// 公用样式可以放在App.vue中
</style>
