<template>
        <div class="layui-form layui-form-pane layui-tab-item  layui-show">
          <validation-observer ref="observer" v-slot="{ validate }">
            <div class="layui-form-item">
              <ValidationProvider  rules="required|email" v-slot="{errors}">
              <label for="L_email" class="layui-form-label">邮箱</label>
              <div class="layui-input-inline">
                <input type="text" id="L_email" v-model="username" name="email" required lay-verify="email" autocomplete="off" value="" class="layui-input">
              </div>
              <div class="layui-form-mid layui-word-aux">如果您在邮箱已激活的情况下，变更了邮箱，需<a href="activate.html" style="font-size: 12px; color: #4f99cf;">重新验证邮箱</a>。</div>
              <div class="layui-form-mid">
                    <span style="color: #c00;">{{errors[0]}}</span>
               </div>
            </ValidationProvider>
            </div>
            <ValidationProvider  rules="required|min:2" v-slot="{errors}">
              <div class="layui-form-item">
                <label for="L_username" class="layui-form-label">昵称</label>
                <div class="layui-input-inline">
                  <input type="text" id="L_username" v-model="name" name="昵称" required lay-verify="required" autocomplete="off" value="" class="layui-input">
                </div>
                <div class="layui-form-mid">
                    <span style="color: #c00;">{{errors[0]}}</span>
               </div>
              </div>
            </ValidationProvider>
            <div class="layui-form-item">
              <label for="L_city" class="layui-form-label">城市</label>
              <div class="layui-input-inline">
                <input type="text" id="L_city"  v-model="location" name="location" autocomplete="off" value="" class="layui-input">
              </div>
            </div>
            <div class="layui-form-item layui-form-text">
              <label for="L_sign" class="layui-form-label">签名</label>
              <div class="layui-input-block">
                <textarea placeholder="随便写些什么刷下存在感" v-model="regmark" id="L_sign"  name="sign" autocomplete="off" class="layui-textarea" style="height: 80px;"></textarea>
              </div>
            </div>
            <div class="layui-form-item">
              <button class="layui-btn" key="set-mine"  @click="validate().then(sumbit)">确认修改</button>
            </div>
          </validation-observer>
        </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { basic } from '../../../api/user'
export default {
  name: 'myinfo',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      username: '',
      name: '',
      location: '',
      regmark: ''
    }
  },
  mounted () {
    const { username, name, location, regmark } = this.$store.state.userinfo
    this.username = username || ''
    this.name = name || ''
    this.location = location || ''
    this.regmark = regmark || ''
  },
  methods: {
    sumbit () {
      const isValid = this.$refs.observer.validate()
      console.log(isValid)
      if (!isValid) {
        return false
      } else {
        const updatainfo = {
          username: this.username,
          name: this.name,
          location: this.location,
          regmark: this.regmark
        }
        basic(updatainfo).then((res) => {
          if (res.code === 200) {
            this.$alert('修改成功')
            this.$store.commit('setuserinfo', res.data)
          }
        })
      }
    }
  }
}
</script>

<style>

</style>
