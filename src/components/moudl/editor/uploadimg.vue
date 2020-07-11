<template>
<transition name="fade">
  <div v-show="isshow" class="layui-layer layui-layer-page layui-layer-border edit-content" ref='wrapper'>
      <div class="layui-layer-title">插入图片 </div>
      <div class="layui-layer-content">
          <ul class="layui-form layui-form-pane">
              <li class="layui-form-item">
                  <div class="layui-input-inline">
                    <input v-model='imgboj' type="text" class="layui-input" placeholder="粘贴图片地址或者点击上传"/>
                  </div>
                  <button type="button" class="layui-btn">
                      <label for="uplodimg">
                          <i class="layui-icon layui-icon-upload"></i>上传图片
                      </label>
                  </button>
                  <input type="file" @change='uploadimg'  style="display:none"
                  name="file" class="layui-input" id="uplodimg">
              </li>
              <li class="layui-form-item">
                  <button @click='sumbit' class="layui-btn">确认</button>
              </li>
          </ul>

      </div>
  </div>
  </transition>
</template>
<script>
import { uploade } from '../../../api/content'
import config from '../../../config/index'
export default {
  name: 'uploadimg',
  props: [
    'isshow',
    'ctrl'
  ],
  data () {
    return {
      imgboj: '',
      formdate: {}
    }
  },
  methods: {
    uploadimg (e) {
      const file = e.target.files
      console.log(11111, file)
      const formdate = new FormData()
      if (file.length > 0) {
        formdate.append('file', file[0])
        this.formdate = formdate
        console.log(31, this.formdate)
      }
      uploade(this.formdate).then((res) => {
        if (res.code === 200) {
          console.log(res)
          const baseurl =
          process.env.NODE_ENV === 'production'
            ? config.baseURL.pro
            : config.baseURL.dev
          this.imgboj = baseurl + res.data
        }
        document.getElementById('uplodimg').value = ''
      })
    },
    sumbit () {
      if (this.imgboj === '') {
        this.$alert('请先添加图片链接或者上传图片')
        return
      }
      this.$emit('addevent', this.imgboj)
      this.$emit('addfacevet')
      setTimeout(() => {
        this.imgboj = ''
        this.formdate = ''
      }, 0)
    },
    changeface (item) {
      this.$emit('addfacevet', item)
    }

  }

}
</script>

<style lang="scss" scoped>
.edit-content{
    position: absolute;
    top: 45px;
}
.layui-form-item{
    text-align: right;
}
.layui-form-pane{
   margin:20px
}
</style>
