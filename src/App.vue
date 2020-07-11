<template>
  <div id="app">
    <imooc-header></imooc-header>
    <router-view></router-view>
    <imooc-footer></imooc-footer>
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
export default {
  name: 'app',
  components: {
    'imooc-header': Header,
    'imooc-footer': Footer
  }
}
</script>

<style lang="scss">
@import "assets/css/global.css";
@import "assets/css/layer/layer.css";
// 公用样式
.svg {
  position: relative;
  top: -4px;
}
.text-center{
  text-align: center;
}
.text-left{
  text-align: left;
}
.text-right{
  text-align: right;
}
 @keyframes bounceIn{
   0% {
        opacity:0;
        transform: scale(0.5);
   }
   100%{
        opacity:1;
        transform: scale(1);
   }
}
@keyframes bounceOut {
    0% {
        transform: scale(1);
   }
   30%{
        opacity:0.5;
        transform: scale(1.05);
   }
   100%{
        opacity:0;
        transform: scale(0.7);
   }
}
.fade-leave-active {
  animation: bounceOut 0.3s
}
.fade-enter-active {
 animation:bounceIn 0.3s
}
</style>
