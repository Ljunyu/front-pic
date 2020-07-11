<template>
  <div>
 <ul class="fly-list">
          <li v-for="(item,index) in items" :key="'list'+index" @click="getdetail(index)">
            <a  class="fly-avatar">
              <img :src="item.pic" alt="贤心">
            </a>
            <h2>
              <a class="layui-badge">{{item.catalog}}</a>
              <a >{{item.title}}</a>
            </h2>
            <div class="fly-list-info">
              <a>
                <!-- <cite>{{item.uid.name}}</cite> -->
                    <!-- <cite>123</cite> -->
                <!--<i class="iconfont icon-renzheng" title="认证信息：XXX"></i>-->
                <!-- <i class="layui-badge fly-badge-vip" v-if="item.uid.isvip!='0'">{{'vip'+ item.uid.isvip}}</i> -->
              </a>
              <span>{{item.created|moment}}</span>

              <span class="fly-list-kiss layui-hide-xs" title="悬赏飞吻"><i class="iconfont icon-kiss"></i> {{item.fav}}</span>
              <span class="layui-badge fly-badge-accept layui-hide-xs" v-show='item.status !== 0'>已结</span>
              <span class="fly-list-nums">
                <i class="iconfont icon-pinglun1" title="回答"></i> {{item.answer}}
              </span>
            </div>
            <div class="fly-list-badge" v-if='item.tags.length>0 && item.tags[0].name !==""'>
              <span class="layui-badge layui-bg-red" v-for="(st , ind) in item.tags" :key="ind">{{st.name}}</span>
            </div>
          </li>
        </ul>
        <div style="text-align: center">
          <div class="laypage-main">
            <a class="laypage-next" @click.prevent='more()'>更多求解</a>
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
        switch (item.catalog) {
          case 'ask':
            item.catalog = '提问'
            break
          case 'advise':
            item.catalog = '建议'
            break
          case 'discuss':
            item.catalog = '交流'
            break
          case 'share':
            item.catalog = '分享'
            break
          case 'news':
            item.catalog = '动态'
            break
        }
      })
      console.log(this.list)
      return this.list
    }
  },
  methods: {
    getdetail (index) {
        this.$router.push({
          name: 'deatil',
          params: {
            id: this.list[index]._id
          }
        })
    },
    more () {
      this.$emit('nextpage')
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
