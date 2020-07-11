<template>
<transition name="fade" >
  <div id="preview" v-show="isshow" class="layui-layer layui-layer-page layui-layer-border edit-content" ref='wrapper'>
      <div class="layui-layer-title">预览 </div>
      <div class="layui-layer-content">
          <ul class="layui-form layui-form-pane">
              <li class="layui-form-item">
                  <div class="layui-input-inline">
                    <div class="detail-body" v-html="rpalacecontent">

                    </div>
                  </div>
              </li>
          </ul>
      </div>
  </div>
  </transition>
</template>
<script>
import { escapeHtmle } from '../../../util/escape.js'
export default {
  name: 'preview',
  props: [
    'isshow',
    'content'
  ],
  data () {
    return {
      imgboj: ''
    }
  },
  computed: {
    rpalacecontent () {
         if (typeof this.content === 'undefined' || this.content.trim() === '') {
        return false
      } else {
        return escapeHtmle(this.content)
      }
    }

  },
  methods: {
      sumbit () {
        this.$emit('addevent', this.imgboj)
        this.$emit('addfacevet')
      }
  }
}
</script>

<style lang="scss" scoped>
#preview{
    width: 100%;
    height: 100%;
    background: #ffffff;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
}
.edit-content{
    position: absolute;
    top: 45px;
    z-index: 999;
}
.layui-form-item{
    text-align: right;
}
.layui-form-pane{
   margin:20px
}
.right4{
    text-align: right;
    margin-right: 20px;
}
</style>
