<template>
<transition name="fade" >
  <div :style="{height:height+170+'px',width:width+'px'}" v-show="isshow" class="layui-layer layui-layer-page layui-layer-border edit-content" ref='wrapper'>
      <div class="layui-layer-title">代码块 </div>
      <div class="layui-layer-content">
          <ul class="layui-form layui-form-pane">
              <li class="layui-form-item">
                  <div class="layui-input-inline">
                    <textarea v-model='imgboj' type="text" :style="{height:height+'px',width:width-50+'px'}"  >
                    </textarea>
                  </div>
              </li>
          </ul>
          <div class="right4">
            <button type="button" @click="sumbit" class="layui-btn">
                       确认
            </button>
          </div>
      </div>
  </div>
  </transition>
</template>
<script>
export default {
  name: 'linkadd',
  props: [
    'isshow',
    'width',
    'height'
  ],
  data () {
    return {
      imgboj: ''
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
