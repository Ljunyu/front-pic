<template>
<div v-show="isshow==true">
   <div class="body">
        <div class="alert">
                {{msg}}
        </div>
        <div class="btn" v-if="type === 'alert'">
            <div class="queding" @click="cloes()">确定</div>
        </div>
        <div class="csd" v-else>
            <div class="quxiao" @click="cancelevent()">取消</div>
            <div class="suncc" @click="successevent()">确定</div>
        </div>
    </div>
    <div  class="zhezhao" @click="guanbu()">

    </div>
</div>

</template>

<script>
export default {
  props: {
    cancel: {
      type: Function,
      default: () => {
        console.log('点击了取消')
      }
    },
    success: {
      type: Function,
      default: () => {
        console.log('点击了确定方法')
      }
    },
    type: {
      type: String,
      default: 'alert'
    },
    msg: {
      type: String,
      default: ''
    },
    isshow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    cancelevent () {
      this.success()
      this.cloes()
    },
    successevent () {
      this.success()
      this.cloes()
    },
    cloes () {
      this.isshow = false
    },
    guanbu () {
      if (this.type === 'alert') {
        console.log(1)
        this.cloes()
      }
      console.log(this.type)
    }
  }
}
</script>

<style lang="sass" scoped>
.body
    z-index: 999
    background: #ffffff
    border: none
    position: fixed
    width: 300px
    height: 150px
    left: 50%
    top: 50%
    margin-left: -150px
    margin-top:-75px
    border-radius:5px
    box-shadow: 0 5px 8px rgba(0,0,0 ,0.5 )
    .alert
        display: flex
        align-items: center
        justify-content: center
        height: 100px
    .btn
        color: #ffffff
        display: flex
        justify-content: center
        line-height: 32px
        .queding
            text-align: center
            width: 105px
            height: 32px
            border-radius: 5px
            background-color: #009688
    .csd
        display: flex
        justify-content: center
        align-items: center
        .quxiao
          padding: 3px 5px
          background: #009688
          color: #ffffff
          margin: 3px
          border-radius: 3px
        .suncc
          padding: 3px 5px
          background: rgb(55,55 ,55 )
          color: #ffffff
          margin: 3px
          border-radius: 3px

.zhezhao
    position: fixed
    width: 100%
    height: 100%
    background: rgba(0,0 ,0 ,0.5 )
    left: 0
    top: 0
    z-index: 666
</style>
