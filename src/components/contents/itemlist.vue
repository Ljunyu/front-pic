<template>
  <div>
 <ul class="fly-list">
          <li v-for="(item,index) in items" :key="'list'+index">
            <a href="user/home.html" class="fly-avatar">
              <img src="https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg" alt="贤心">
            </a>
            <h2>
              <a class="layui-badge">{{item.catlog}}</a>
              <a href="jie/detail.html">{{item.title}}</a>
            </h2>
            <div class="fly-list-info">
              <a href="user/home.html" link>
                <cite>{{item.uid.name}}</cite>
                <!--<i class="iconfont icon-renzheng" title="认证信息：XXX"></i>-->
                <i class="layui-badge fly-badge-vip" v-if="item.uid.isvie!='0'">{{'vip'+ item.uid.isvip}}</i>
              </a>
              <span>{{item.created}}</span>

              <span class="fly-list-kiss layui-hide-xs" title="悬赏飞吻"><i class="iconfont icon-kiss"></i> {{item.fav}}</span>
              <span class="layui-badge fly-badge-accept layui-hide-xs" v-show='item.status !== 0'>已结</span>
              <span class="fly-list-nums">
                <i class="iconfont icon-pinglun1" title="回答"></i> {{item.answer}}
              </span>
            </div>
            <div class="fly-list-badge">
              <span class="layui-badge layui-bg-red" v-if='item.tags.length>0'>精帖</span>
            </div>
          </li>
        </ul>
        <div style="text-align: center">
          <div class="laypage-main">
            <a href="jie/index.html" class="laypage-next" @click.prevent='more()'>更多求解</a>
          </div>
        </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'itemlist',
  props: ['list'],
  computed: {
    items () {
      _.map(this.list, (item) => {
        switch (item.catlog) {
          case 'ask':
            item.catlog = '提问'
            break
          case 'advise':
            item.catlog = '建议'
            break
          case 'discuss':
            item.catlog = '交流'
            break
          case 'share':
            item.catlog = '分享'
            break
          case 'news':
            item.catlog = '动态'
            break
        }
      })
      console.log(this.list)
      return this.list
    }
  },
  methods: {
    more () {
      this.$emit('nextpage')
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
