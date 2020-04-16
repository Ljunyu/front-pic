<template>
<div  style="
    background-color: white;
    border-bottom: 1px solid #eeeeee;
    margin-bottom: 10px;"
    >
     <div class="fly-panel-title fly-filter">
          <a>置顶</a>
          <a href="#signin" class="layui-hide-sm layui-show-xs-block fly-right" id="LAY_goSignin" style="color: #FF5722;">去签到</a>
     </div>
     <listitem></listitem>
</div>
</template>

<script>
import listitem from './itemlist'
export default {
  name: 'Top',
  components: {
    listitem
  }
}
</script>

<style lang="sass" scoped>

</style>
