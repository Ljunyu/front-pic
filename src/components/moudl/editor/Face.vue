<template>
<transition name="fade" >
     <div v-show="isshow" class="layui-layer posts layui-layer-tips layui-edit-face">
      <div class="layui-layer-content">
         <ul class="layui-clear" >
            <li @click="changeface(index)" v-for="(item,index) in lists" :key="index">
                <img :src="item" :alt="index"  :title="index">
            </li>
        </ul>
      </div>
    </div>
</transition>
</template>
<script>
import faces from '../../../assets/js/face'
export default {
  name: 'Face',
  props: [
    'isshow',
    'ctrl'
  ],
  data () {
    return {
      lists: faces
    }
  },
  methods: {
    changeface (item) {
      this.$emit('addfacevet')
      this.$emit('addevent', item)
    }

  }
}
</script>
<style lang="scss" >

.posts{
    position: absolute;
    top: 45px;
}

</style>
