<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li>
            <router-link :to="{name: 'login'}">登入</router-link>
          </li>
          <li class="layui-this">注册</li>
        </ul>
        <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
          <div class="layui-tab-item layui-show">
            <div class="layui-form layui-form-pane">
              <validation-observer ref="observer" v-slot="{ validate }" >
                <div class="layui-form-item">
                  <div class="layui-row">
                    <label for="L_email" class="layui-form-label">用户名</label>
                    <Validation-provider  rules="required|email" name='username' v-slot="{errors}" >
                          <div class="layui-input-inline">
                            <input
                              type="text"
                              name="username"
                              v-model="username"
                              rules="required|email"
                              placeholder="请输入用户名"
                              autocomplete="off"
                              class="layui-input"
                            />
                          </div>
                         <div class="layui-form-mid layui-word-aux">将会成为您唯一的登入名</div>
                        <div class="layui-row">
                          <span style="color: #c00;">{{errors[0]}}</span>
                        </div>
                  </Validation-provider>
                  </div>
                </div>
                 <div class="layui-form-item">
                  <label for="L_username" class="layui-form-label">昵称</label>
                <Validation-provider  rules="required|min:4"  v-slot="{errors}" >
                  <div class="layui-input-inline">
                    <input
                      type="text"
                      name="name"
                      v-model="name"
                      placeholder="请输入昵称"
                      autocomplete="off"
                      class="layui-input"
                    />
                  </div>
                  <div class="layui-form-mid">
                   <span style="color: #c00;">{{errors[0]}}</span>
                  </div>
                  </Validation-provider>
                </div>
                <div class="layui-form-item">
                   <Validation-provider  rules="required|min:6|confirmed:confirmation|max:16"  v-slot="{errors}" >
                  <div class="layui-row">
                    <label for="L_pass" class="layui-form-label">密码</label>
                    <div class="layui-input-inline">
                      <input
                        type="password"
                        name="password"
                        v-model="password"
                        ref="password"
                        placeholder="请输入密码"
                        autocomplete="off"
                        class="layui-input"
                      />
                    </div>
                    <div class="layui-form-mid layui-word-aux">6到16个字符</div>
                  </div>
                  <div class="layui-row">
                     <span style="color: #c00;">{{errors[0]}}</span>
                  </div>
                   </Validation-provider>
                </div>
                <div class="layui-form-item">
                   <Validation-provider vid="confirmation" v-slot="{errors}" >
                  <div class="layui-row">
                    <label for="L_repass" class="layui-form-label">确认密码</label>
                    <div class="layui-input-inline">
                      <input
                        type="password"
                        name="repassword"
                        v-model="repassword"
                        placeholder="请输入密码"
                        autocomplete="off"
                        class="layui-input"
                      />
                    </div>
                  </div>
                  <div class="layui-row">
                   <span style="color: #c00;">{{errors[0]}}</span>
                  </div>
                  </Validation-provider>
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
                </div>
                <div class="layui-form-item">
                  <button class="layui-btn" lay-filter="*" @click="validate().then(sumbit)"   lay-submit>立即注册</button>
                </div>
                <div class="layui-form-item fly-form-app">
                  <span>或者直接使用社交账号快捷注册</span>
                  <a
                    href
                    onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})"
                    class="iconfont icon-qq"
                    title="QQ登入"
                  ></a>
                  <a
                    href
                    onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})"
                    class="iconfont icon-weibo"
                    title="微博登入"
                  ></a>
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
import { getCode, redylogin } from '@/api/login'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
export default {
  name: 'reg',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      username: '',
      name: '',
      password: '',
      repassword: '',
      code: '',
      svg: ''
    }
  },
  mounted () {
    this._getCode()
  },
  methods: {
    _getCode () {
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
      const options = {
        username: this.username,
        name: this.name,
        password: this.password,
        repassword: this.repassword,
        code: this.code,
        uuid: this.$store.state.uuid
      }
      redylogin(options).then((res) => {
        if (res.code === 200) {
          this.$alert('注册成功，跳转登录')
          setTimeout(() => {
            this.$router.push({ path: '/login' })
          }, 1000)
        } else {
          console.log(res.msg)
          this.$refs.observer.setErrors(res.msg)
        }
      }, (err) => {
        console.log(err)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
// 公用样式可以放在App.vue中
</style>
