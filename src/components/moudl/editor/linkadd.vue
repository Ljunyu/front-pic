<template>
<transition name="fade">
  <div v-show="isshow" class="layui-layer layui-layer-page layui-layer-border edit-content" >
      <div class="layui-layer-title">插入链接 </div>
      <div class="layui-layer-content">
          <ul class="layui-form layui-form-pane">
              <li class="layui-form-item">
                  <div class="layui-input-inline">
                    <input v-model='imgboj' type="text" class="layui-input" placeholder="添加链接地址"/>
                  </div>
                  <button type="button" class="layui-btn">
                      <label  @click="sumbit">
                         确认
                      </label>
                  </button>
              </li>
          </ul>
      </div>
  </div>
  </transition>
</template>
<script>
export default {
  name: 'linkadd',
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
      console.log(this.imgboj)
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
