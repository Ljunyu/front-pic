<template>
  <div class="fly-panel fly-panel-user" pad20>
    <div class="layui-tab layui-tab-brief">
        <ul class="layui-tab-title">
          <li>
            <router-link :to="{name:'myposts'}">我发表的贴</router-link>
          </li>
           <li>
            <router-link :to="{name:'mycolle'}">我收藏的贴</router-link>
          </li>
        </ul>
        <div class="layui-tab-content">
          <router-view></router-view>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'posts'
}
</script>

<style lang="scss" scoped>

</style>
