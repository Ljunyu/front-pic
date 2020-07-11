<template>
  <div class="contens">
  <div class="fly-panel fly-panel-user" pad20>
    <div class="layui-tab layui-tab-brief" lay-filter="user">
      <ul class="layui-tab-title" id="LAY_mine">
        <li  lay-id="info"> <router-link :to="{name:'myinfo'}">我的资料</router-link></li>
        <li lay-id="avatar"> <router-link :to="{name:'myfile'}">头像</router-link></li>
        <li lay-id="pass"><router-link :to="{name:'changepwd'}">密码</router-link></li>
        <li lay-id="bind"><router-link :to="{name:'myadmin'}">帐号绑定</router-link></li>
      </ul>
      <div class="layui-tab-content" style="padding: 20px 0;">
        <router-view></router-view>
             <!-- 修改治疗 -->
        </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'setting'
}
</script>

<style lang='scss' scoped>
  .contens{
   margin:0px 0px 10px 225px;
    background-color: #ffffff;
    font-size: 16px;
  }
</style>
