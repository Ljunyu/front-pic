<template>
<div>
      <div class="panel">
          <div class="layui-container">
              <ul>
                  <li><a href="">首页</a></li>
                  <li><a href="">提问</a></li>
                  <li><a href="">分享</a></li>
                  <li><a href="">讨论</a></li>
                  <li><a href="">建议</a></li>
                  <li><a href="">公告</a></li>
                  <li><a href="">动态</a></li>
                  <li><span class="shuxian"></span></li>
                  <li><a href="">我发表的贴</a></li>
                  <li><a href="">我收藏的贴</a></li>
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
  name: 'Panel'
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
