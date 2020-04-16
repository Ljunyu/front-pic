<template>
<div>
      <div class="panel fly-column">
          <div class="layui-container">
              <ul >
                 <router-link v-for="(item,index) in lists" :key='"pal"+index' tag="li" :to='item.path'>
                    <a>{{item.name}}</a>
                 </router-link>
                  <li><span class="shuxian"></span></li>
                  <template v-if='islogin==true'>
                    <li><a href="">我发表的贴</a></li>
                    <li><a href="">我收藏的贴</a></li>
                  </template>
              </ul>
              <div class="serach">
                <span class="layui-icon layui-icon-search"></span>
                <a href="">发布新贴</a>
              </div>
          </div>
      </div>
  </div>
</template>

<script>

export default {
  name: 'Panel',
  data () {
    return {
      lists: [
        {
          name: '首页',
          istrue: false,
          path: '/'
        },
        {
          name: '提问',
          istrue: false,
          path: '/index/ask'
        },
        {
          name: '分享',
          istrue: false,
          path: '/index/share'
        },
        {
          name: '讨论',
          istrue: false,
          path: '/index/discuss'
        },
        {
          name: '建议',
          istrue: false,
          path: '/index/advise'
        },
        {
          name: '公告',
          istrue: false,
          path: '/index/notice'
        }

      ],
      islogin: this.$store.state.islogin
    }
  },
  mounted () {
    console.log(this.lists)
  }
}
</script>

<style lang="scss" scoped>
.panel{
    background-color: #fff;
    height: 50px;
    line-height: 50px;
    border: 0px;
    border-radius: 3px;
    box-shadow: rgba($color: #999999, $alpha: 1.0);
}
ul{
    position: relative;
    li {
        display: inline-block;
    }
        a {
            padding: 0 20px;
        }
    .shuxian{
    width: 1px;
    height: 15px;
    background-color: #cccccc;
    display: inline-block;
    vertical-align: middle;
    margin: 0 20px;
}
}
.serach{
    position: absolute;
    top: 0;
    right: 10px;
    .layui-icon-search{
        margin-right: 20px;
        font-size: 20px;
        &:hover {
            color:rgb(4, 100, 124);
        }
    }
    a {
        padding: 10px 20px;
        background:  rgb(9, 92, 57);
        color: #fff;
        border-radius: 3px;
    }
}
</style>
