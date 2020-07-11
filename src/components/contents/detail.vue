<template>
<div class="layui-container">
    <panel></panel>
  <div class="layui-row layui-col-space15">
    <div class="layui-col-md8 content detail">
      <div class="fly-panel detail-box">
        <h1>{{page.title}}</h1>
        <div class="fly-detail-info">
          <!-- <span class="layui-badge">审核中</span> -->
          <span class="layui-badge layui-bg-green fly-detail-column" v-if="page.catalog==='news'">动态</span>
          <span class="layui-badge layui-bg-green fly-detail-column" v-else-if="page.catalog==='ask'">提问</span>
          <span class="layui-badge layui-bg-green fly-detail-column" v-else-if="page.catalog==='advise'">建议</span>
          <span class="layui-badge layui-bg-green fly-detail-column" v-else-if="page.catalog==='discuss'">交流</span>
          <span class="layui-badge layui-bg-green fly-detail-column" v-else-if="page.catalog==='share'">分享</span>
          <span class="layui-badge" style="background-color: #999;"  v-if="parseInt(page.isEnd)===0" >未结</span>
          <span class="layui-badge" style="background-color: #5FB878;"  v-else>已结</span>
          <span class="layui-badge layui-bg-black" v-if="parseInt(page.isTOP)===1">置顶</span>
          <span class="layui-badge layui-bg-red" v-for="(item,index) in page.tags" :key="'tag'+index">{{item.name}}</span>
          <div class="fly-admin-box" data-id="123">
            <span class="layui-btn layui-btn-xs jie-admin" type="del">删除</span>
            <span class="layui-btn layui-btn-xs jie-admin" type="set" field="stick" rank="1">置顶</span>
            <!-- <span class="layui-btn layui-btn-xs jie-admin" type="set" field="stick" rank="0" style="background-color:#ccc;">取消置顶</span> -->
            <span class="layui-btn layui-btn-xs jie-admin" type="set" field="status" rank="1">加精</span>
            <!-- <span class="layui-btn layui-btn-xs jie-admin" type="set" field="status" rank="0" style="background-color:#ccc;">取消加精</span> -->
          </div>
          <span class="fly-list-nums">
            <a href="#comment"><i class="iconfont" title="回答">&#xe60c;</i> {{page.answer}}</a>
            <i class="iconfont" title="人气">&#xe60b;</i> {{page.reads}}
          </span>
        </div>
        <div class="detail-about">
          <a class="fly-avatar" >
            <img :src="page.uid?page.uid.pic:'https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg'" :title="page.uid?page.uid.name:''">
          </a>
          <div class="fly-detail-user">
            <a  class="fly-link">
              <cite>{{page.uid?page.uid.name:'等风'}}</cite>
              <i class="iconfont icon-renzheng" v-if="page.uid?page.uid.isvip>0?true:false:false" ></i>
              <i class="layui-badge fly-badge-vip" v-if="page.uid?page.uid.isvip>0?true:false:false">VIP{{page.uid.isvip}}</i>
            </a>
            <span>{{page.created|moment}}</span>
          </div>
          <div class="detail-hits" id="LAY_jieAdmin" data-id="123">
            <span style="padding-right: 10px; color: #FF7200">悬赏：{{page.fav}}积分</span>
          </div>
        </div>
        <div class="layui-btn-container fly-detail-admin">
            <a href class="layui-btn layui-btn-sm jie-admin">编辑</a>
            <a href class="layui-btn layui-btn-sm jie-admin jie-admin-collect">收藏</a>
        </div>
        <div class="detail-body photos" v-html="content">
        </div>
      </div>

      <div class="fly-panel detail-box" id="flyReply">
        <fieldset class="layui-elem-field layui-field-title" style="text-align: center;">
          <legend>回帖</legend>
        </fieldset>

        <ul class="jieda" id="jieda">
          <li data-id="111" class="jieda-daan" v-for="(item,index) in comments" :key="'c'+index">
            <div class="detail-about detail-about-reply">
              <a class="fly-avatar" href="">
                <img :src="item.cuid?item.cuid.pic?item.cuid.pic:'https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg':'https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg'" alt=" ">
              </a>
              <div class="fly-detail-user">
                <a class="fly-link">
                  <cite>{{item.cuid?item.cuid.name:'等风'}}</cite>
                  <i class="iconfont icon-renzheng" v-if="item.cuid?item.cuid.isvip>0?true:false:false" ></i>
                  <i class="layui-badge fly-badge-vip"  v-if="item.cuid?item.cuid.isvip>0?true:false:false">{{item.cuid.isvip}}</i>
                </a>

                <span v-show="index==0">(楼主)</span>
                <!--
                <span style="color:#5FB878">(管理员)</span>
                <span style="color:#FF9E3F">（社区之光）</span>
                <span style="color:#999">（该号已被封）</span>
                -->
              </div>

              <div class="detail-hits">
                <span>{{item.created|moment}}</span>
              </div>
              <i v-if="parseInt(item.isBest)===1" class="iconfont icon-caina" title="最佳答案"></i>
            </div>
            <div class="detail-body jieda-body photos" v-richtext="item.content">
            </div>
            <div class="jieda-reply">
              <span class="jieda-zan " @click="setzan(item)" :class="{zanok:item.handed=='1'}" type="zan">
                <i class="iconfont icon-zan"></i>
                <em>{{item.hands}}</em>
              </span>
              <span type="reply">
                <i class="iconfont icon-svgmoban53">
                </i>
                回复
              </span>
              <div class="jieda-admin">
                <span type="edit" @click="editComment(item)" v-show="page.isEnd==='0' && item.cuid._id===user._id">编辑</span>
                <!-- <span type="del">删除</span> -->
                <span class="jieda-accept"  @click="setBests(item)"  v-show="page.isEnd==='0' && page.uid._id===user._id" type="accept">采纳</span>
              </div>
            </div>
          </li>
          <!-- 无数据时 -->
          <li class="fly-none" v-if="pages===0">消灭零回复</li>
        </ul>
        <!-- 分页功能 -->
          <pagenation @changeCurrent="changepage" :total='pages' :size='sizes' :current='current'></pagenation>
        <div class="layui-form layui-form-pane">
         <edit @contents="changecontent" :initcontent="editInfo.content"></edit>
          <button class="layui-btn " @click="sumbit()">提交回复</button>
        </div>
      </div>
    </div>
    <div class="layui-col-md4">
      <HostList></HostList>
      <Ads></Ads>
      <Links></Links>
    </div>
  </div>
</div>
</template>

<script>
import HostList from '../sidebar/HostList'
import Ads from '../sidebar/Ads'
import panel from '../Panel'
import Links from '../sidebar/Links'
import edit from '../moudl/editor/index'
import pagenation from '../moudl/page'
import { getdetil, getcomments, addcomments, updatacommont, setBest, setHands } from '../../api/content'
import { escapeHtmle } from '../../util/escape'
import Codemix from '../../mixin/code'
import { scrollToElem } from '../../util/common'
export default {
    components: {
        HostList,
        Ads,
        Links,
        panel,
        edit,
        pagenation
    },
    mixins: [Codemix],
    name: 'detail',
    data () {
      return {
        current: 0,
        sizes: 10,
        pages: 0,
        detailid: '',
        page: '', // 帖子信息
        comments: '',
        editInfo: {
          tid: '',
          content: ''
        }
      }
    },
     computed: {
       user () {
         return this.$store.state.userinfo
       },
      content () {
        if (typeof this.page.content === 'undefined') {
          return
        }
        if (this.page.content.trim() === '') {
          return
        }
        return escapeHtmle(this.page.content)
       }
    },
    mounted () {
    this.init()
    this.getcomem()
  },
    methods: {
      setzan (item) {
        console.log(item)
        setHands({ cid: item._id }).then((res) => {
          console.log(res)
          if (res.code === 200) {
            item.hands++
            }
            this.$alert(res.msg)
        })
      },
      // 编辑
      editComment (item) {
        console.log(item)
        scrollToElem('#edits', 1000, -75)
          this.editInfo.content = item.content
          // 确定需要编辑的记录
          this.editInfo.cid = item._id
      },
      // 采纳最佳答案
      setBests (item) {
        this.$confirm('确定采纳为最佳答案吗？', () => {
          const options = {
            tid: this.page._id,
            cid: item._id
          }
          setBest({ options }).then((res) => {
            if (res.code === 200) {
              this.page.isEnd = '1'
              item.isBest = '1'
            }
          })
        })
      },
      // 提交回复
      sumbit () {
        if (this.$store.state.islogin === false) {
          this.$alert('请先登录')
          return
        }
         this.editInfo.tid = this.page._id
        if (typeof this.editInfo.cid !== 'undefined' && this.editInfo.cid !== '') {
          updatacommont({ editInfo: this.editInfo }).then((res) => {
            if (res.code === 200) {
            this.$alert('更新成功')
            this.editInfo.info = ''
            this.editInfo.content = ''
            this.getcomem()
            }
            console.log(res)
          })
          return
          // 更新评论
        }
        addcomments({ editInfo: this.editInfo }).then((res) => {
          console.log(res)
          if (res.code === 200) {
            console.log(3)
            this.editInfo.info = ''
            this.editInfo.content = ''
            this.getcomem()
          }
        })
      },
      changecontent (val) {
        this.editInfo.content = val
        console.log(333, val)
      },
       init () {
        getdetil({ id: this.$route.params.id }).then((res) => {
          console.log(res)
          if (res.code === 200) {
            this.page = res.data[0]
          }
        })
      },
      getcomem () {
        getcomments({ tid: this.$route.params.id, page: this.current }).then((res) => {
          if (res.code === 200) {
            this.pages = res.total
            this.comments = res.data
          }
        })
      },
      changepage (val) {
        this.current = val
        this.getcomem()
      }
    }
}
</script>

<style lang="scss" scoped>
.fly-detail-admin{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    border-top: 1px dotted #eaeaea;
    background: #f8f8f8;
}
.fly-detail-info{
    span{
        margin-right: 5px;
    }
}
</style>
