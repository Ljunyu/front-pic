<template>
      <div class="layui-form layui-form-pane layui-tab-item  layui-show">
            <div class="layui-form-item">
              <div class="avatar-add">
                <p>建议尺寸168*168，支持jpg、png、gif，最大不能超过5M</p>
                <label for="image"  type="image" class="layui-btn upload-img" >
                  <i class="layui-icon">&#xe67c;</i>上传头像
                </label>
                <input
                  type="file"
                  id="image"
                  class="images"
                 name="file"
                  @change="upload"
                   multiple="multiple"
                  />
                <img :src="pic">
                <span class="loading"></span>
              </div>
            </div>
          </div>
</template>

<script>
import { uploade } from '../../../api/content'
import { basic } from '../../../api/user'
import config from '../../../config/index'
export default {
  name: 'file',
  data () {
    return {
      formdate: '',
      pic: this.$store.state.userinfo && this.$store.state.userinfo.pic ? this.$store.state.userinfo.pic
        : 'http://img.peipeilove.com/img/UserImage/2019/20190314/u_20190314211717171798.jpg'
    }
  },
  methods: {
    upload (e) {
      const file = e.target.files
      console.log(11111, file)
      const formdate = new FormData()
      if (file.length > 0) {
        formdate.append('file', file[0])
        this.formdate = formdate
        console.log(31, this.formdate)
        // eslint-disable-next-line quotes
      }
      uploade(this.formdate).then((res) => {
        if (res.code === 200) {
          const baseurl =
          process.env.NODE_ENV === 'production'
            ? config.baseURL.pro
            : config.baseURL.dev
          this.pic = baseurl + res.data
          basic({ pic: this.pic }).then((requset) => {
            console.log(requset)
            if (requset.code === 200) {
              const userinfo = this.$store.state.userinfo
              userinfo.pic = this.pic
              this.$store.commit('setuserinfo', userinfo)
            }
          })
          document.getElementById('image').value = ''
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.images{
  display: none;
}

</style>
