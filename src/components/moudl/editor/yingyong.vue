<template>
<transition name="fade">
  <div v-show="isshow" class="layui-layer layui-layer-page layui-layer-border edit-content" ref='wrapper'>
      <div class="layui-layer-title">引用 </div>
      <div class="layui-layer-content">
          <ul class="layui-form layui-form-pane">
              <li class="layui-form-item">
                  <div class="layui-input-inline">
                    <textarea v-model='imgboj' type="text" class="layui-textarea" placeholder="添加链接地址">
                    </textarea>
                  </div>

              </li>
          </ul>
            <button @click="sumbit" type="button" class="layui-btn">
                         确认
            </button>
      </div>
  </div>
  </transition>
</template>
<script>
export default {
  name: 'yingyong',
  props: [
    'isshow',
    'ctrl'
  ],
  data () {
    return {
      imgboj: ''
    }
  },
  methods: {
 sumbit () {
      if (this.imgboj !== '') {
      this.$emit('addevent', this.imgboj)
       setTimeout(() => {
         this.imgboj = ''
      }, 0)
      }
      this.$emit('addfacevet')
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
    text-align: center;
}
.layui-form-pane{
   margin:20px
}
</style>
