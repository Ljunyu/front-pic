<template>
<div class="just">
    <div class="layui-box layui-laypage layui-laypage-default " id="layui-laypage-1">
            <a @click.prevent="home()"  v-show='showEnd==true'  class="layui-laypage-prev " data-page="0">
                <i :class="{'layui-disabled':current === 0}" v-if="showtype==='icon'"  class="layui-icon layui-icon-prev"></i>
                 <template v-else>首页</template>
            </a>
             <a @click.prevent="prev()"  :class="{'layui-disabled':current === 0}"> <i v-if="showtype==='icon'" class="layui-icon layui-icon-left"></i>
               <template v-else>上一页</template>
             </a>
              <a href="javascript:;" v-if="pages.length>5 && current-2 > 1">...</a>
             <template  v-for="(item,index) in pages" >
                <a
                @click="change(index)"
                v-if="index>=(current-2) && index<=(current+2)"
                :key="'page'+index"
                :class="[current === index? 'pagestyle':'',current === index ?'active':'']">
                {{item}}</a>
            </template>
            <a  v-if="pages.length>5 && current+2 < pages.length" >...</a>
              <a @click.prevent="next()" :class="{'layui-disabled':current === pages.length-1}" href="javascript:;"><i class="layui-icon layui-icon-right" v-if="showtype==='icon'"></i>
              <template v-else>下一页</template>
              </a>
            <a @click.prevent="end()" :class="{'layui-disabled':current === pages.length-1}"   v-show='showEnd==true' href="javascript:;"><i class="layui-icon layui-icon-next" v-if="showtype==='icon'"></i>
              <template v-else>尾页</template>
            </a>
        </div>
        <div class="toal" v-if="hastotal">
            <span>到</span>
            <input class="inputs" type="text"  name="title"/>
            <span>页</span>
            <span>共{{pages.length}}页</span>
        </div>
</div>
</template>

<script>
import _ from 'lodash'
export default {
    props: {
          alin: {
            type: String,
            default: 'right'
        },
        showtype: {
            type: String,
            default: 'icon'
        },
        showEnd: {
             type: Boolean,
            default: true
        },
        hastotal: {
             type: Boolean,
            default: true
        },
         hasselect: {
             type: Boolean,
            default: false
        },
        total: { // 页数
            type: Number,
            default: 0
        },
        current: { // 当前页
            type: Number,
            default: 0
        },
        size: {
            type: Number,
            default: 10
        }

    },
    name: 'page',
    data () {
        return {
            pages: [],
            limit: 10
        }
    },
    mounted () {
        this.initpages()
    },
    watch: {
        total (newpage, old) {
            this.initpages()
        }
    },
    methods: {
        change (index) {
             this.$emit('changeCurrent', index)
        },
        initpages () {
            const len = Math.ceil(this.total / this.limit)
            console.log(len)
            this.pages = _.range(1, len + 1)
        },
        home () {
            this.$emit('changeCurrent', 0)
        },
        next () {
            console.log(221)
            if (this.current < this.pages.length - 1) { this.$emit('changeCurrent', this.current + 1) }
        },
        prev () {
             if (this.current - 1 < 0) {
                 return
             }
              this.$emit('changeCurrent', this.current - 1)
        },
         end () {
             let curr
             if (this.current + 1 < this.pages.length) {
                curr = this.pages.length - 1
             } else {
                 return
             }
            this.$emit('changeCurrent', curr)
        }
    }
}
</script>

<style lang="scss" scoped>
.layui-laypage{
    a {
        &:first-child{
            border-right: 0;
        }
        &:last-child{
            border-left: 0;
        }
    }
}
.toal{
    display: flex;
    align-items: center;
    flex-flow: row nowrap;
    margin-left: 10px;
    position: relative;
    top:-2px;
    .inputs{
        color: black;
        width: 30px;
        margin: 0 2px;
    }
}
.just{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: row nowrap;
}
.pagestyle{
    background-color: #009688;
     color: white;

}
.pagestyle:hover{
 color: white;
}

</style>
