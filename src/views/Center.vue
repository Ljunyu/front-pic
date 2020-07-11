<template>
    <div class="layui-container fly-marginTop fly-user-main">
        <ul class="layui-nav layui-nav-tree" lay-filter="test">
        <!-- 侧边导航: <ul class="layui-nav layui-nav-tree layui-nav-side"> -->
            <li class="layui-nav-item" v-for="(item,index) in datelist" :key='index'>
                <router-link :to="{name:item.path}" :active-class="item.activecalss">
                    <i class="iconfont-pic" :class="item.icon"></i>
                    {{item.name}}
                </router-link>
            </li>
        </ul>
    <router-view></router-view>
    </div>
</template>
<script lang="ts">
export default {
  name: 'center',
  data () {
    return {
      datelist: [
        { name: '我的主页', icon: 'icon-htmal5icon06', path: 'userhome' },
        { name: '用户中心', icon: 'icon-geren3', path: 'usercenter' },
        { name: '基本设置', icon: 'icon-shezhi', path: 'myinfo', activecalss: 'layui-this' },
        { name: '我的帖子', icon: 'icon-yunyingguanli_tieziguanli', path: 'myposts', activecalss: 'layui-this' },
        { name: '我的消息', icon: 'icon-xinxi', path: 'usermsg' },
        { name: '其他设置', icon: 'icon-qita', path: 'others' }
      ]
    }
  }
}

</script>
<style lang="scss" scoped>
@import '../assets/css/icfont/iconfont.css';
.iconfont-pic{
    margin-right: 10px;
}

</style>
