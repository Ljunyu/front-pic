<template>
       <div class="fly-panel">
             <div class="fly-panel" style="margin-bottom: 0;">
        <div class="fly-panel-title fly-filter">
          <a @click='filter(0)' :class="{'layui-this' : ischek==='' && fiter===''}">综合</a>
          <span class="fly-mid"></span>
          <a @click='filter(1)' :class="{'layui-this' : ischek===1 }">未结</a>
          <span class="fly-mid"></span>
          <a @click='filter(2)' :class="{'layui-this' : ischek===2}">已结</a>
          <span class="fly-mid"></span>
          <a @click='filter(3)' :class="{'layui-this' : ischek===3}">精华</a>
          <span class="fly-filter-right layui-hide-xs">
            <a @click='filter("按最新")' :class="{'layui-this' : fiter==='按最新'}">按最新</a>
            <span class="fly-mid"></span>
            <a @click='filter("按热议")' :class="{'layui-this' : fiter==='按热议'}">按热议</a>
          </span>
        </div>
      <itemlist :list="listis" @nextpage='netx()'></itemlist>
      </div>
      </div>
</template>

<script>
import itemlist from './itemlist'
import { getlist } from '../../api/content'
export default {
  name: 'List',
  components: {
    itemlist
  },
  data () {
    return {
      ischek: '', // 分类
      fiter: '', // 热议
      page: 0,
      limit: 20,
      sort: 'created',
      catlog: '',
      listis: []
    }
  },
  methods: {
    filter (key) {
      switch (key) {
        case 0:
          this.ischek = ''
          this.fiter = ''
          break
        case 1:
          this.ischek = 1
          break
        case 2:
          this.ischek = 2
          break
        case 3:
          this.ischek = 3
          break
        case '按最新':
          this.fiter = '按最新'
          break
        case '按热议':
          this.fiter = '按热议'
          break
        default:
          break
      }
    },
    netx () {
      console.log(1)
      this.page++
      this.init()
    },
    init () {
      const options = {
        istop: 0,
        ischek: this.ischek,
        fiter: this.fiter,
        page: this.page,
        limit: this.limit,
        sort: this.sort,
        catlog: this.catlog
      }
      getlist(options).then((res) => {
        if (res.code === 200) {
          if (res.data.length === 0) {
            this.listis = res.data
          } else {
            this.listis = res.data.concat(res.data)
          }
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  mounted () {
    this.init()
  }

}
</script>

<style lang="sass" scoped>

</style>
