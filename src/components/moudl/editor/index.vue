<template>
  <div class="edit-wrap">
      <div class="layui-form-item layui-form-text">
          <div class="layui-input-block" >
              <div class="layui-unselect fly-edit" ref="icon">
                <span @click="()=>{
                  this.faceisshow=!this.faceisshow}"
                  ><i
                  class="layui-icon layui-icon-face-smile-b"></i></span>
                <span @click="()=>{
                  this.isimgs=!this.isimgs}"
                  >
                  <i class="layui-icon  layui-icon-picture"></i></span>
                <span
                 @click="()=>{
                  this.islink=!this.islink}"
                ><i class="layui-icon  layui-icon-link"></i></span>
                <span

                  @click="()=>{
                  this.iscode=!this.iscode}"
                ><i class="layui-icon  layui-icon-more-vertical"></i></span>
                <span
                   @click="()=>{
                  this.isyy=!this.isyy}"
                ><i class="layui-icon  layui-icon-fonts-code"></i></span>
                <span
                 @click="()=>{
                  this.ispre=!this.ispre}"
                ><i class="layui-icon  layui-icon-tips"></i></span>
              </div>
              <textarea
              @focus="focusevent"
               @blur="blurevent"
               id="edits"
               ref="textEdit" v-model='initcontent' class="layui-textarea fly-editor" name="content">
              </textarea>
          </div>
          <div ref="edito">
            <face :isshow='faceisshow'
                  @addfacevet="close"
                  @addevent="addfas"
                  >
            </face>
            <uploadimg
                @addevent="addpic"
                  :isshow='isimgs'
                  @addfacevet="close"
            ></uploadimg>
            <linkadd
              @addevent="addlink"
            :isshow='islink'
              @addfacevet="close"
            ></linkadd>
            <codes
            :isshow='iscode'
              @addfacevet="close"
                @addevent="addcode"
               :width="codewidth"
               :height="codeheight"

           ></codes>
             <yingyong
               @addevent="addyy"
             :isshow='isyy'
              @addfacevet="close"
             >
             </yingyong>
             <preview
             :content = 'initcontent'
             :isshow='ispre'
             ></preview>
          </div>
      </div>
  </div>
</template>

<script>
import face from './Face'
import uploadimg from './uploadimg'
import linkadd from './linkadd'
import codes from './code'
import yingyong from './yingyong'
import preview from './preview'
export default {
  name: 'editor',
  components: {
    face,
    uploadimg,
    linkadd,
    codes,
    preview,
    yingyong
  },
  props: {
    initcontent: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      faceisshow: false,
      isimgs: false,
      ispre: false,
      islink: false,
      iscode: false,
      isyy: false,
      codewidth: 400,
      codeheight: 400,
      pop: '' // 光标位置
    }
  },
  updated () {
     this.$emit('contents', this.initcontent)
  },
  methods: {
    // 获取光标位置进行保存
    getpos () {
        let pops = 0
        const pose = document.getElementById('edits')
        // 未考虑ie ie通过character获取光标位置
        if (pose.selectionStart || pose.selectionStart === '0') {
          pops = pose.selectionStart
        }
        this.pop = pops
        console.log(this.pop)
    },
    focusevent () {
      console.log('focusevent')
      this.getpos()
    },
    blurevent () {
        console.log('blurevent')
      this.getpos()
    },
    insets (item) {
      console.log(123)
      if (item === '') {
        return
      }
     const tmp = this.initcontent.split('')// 将每个字符都变为数组
     tmp.splice(this.pop, 0, item) // 通过光标位置插入信息返回数组形式
     this.initcontent = tmp.join('') // 将数组重新组合为字符串
    },
    // 插入表情
    addfas (item) {
       if (item === '') {
          return
      }
      console.log(item)
      const iserobj = ` face${item}`
      this.insets(iserobj)
      this.pop += iserobj.length
    },
    // 插入图片
    addpic (item) {
      if (item === '') {
          return
      }
      const iserobj = ` img[${item}]`
      this.insets(iserobj)
       this.pop += iserobj.length
    },
     // 插入图片
    addlink (item) {
      const iserobj = ` a(${item})[${item}]`
      this.insets(iserobj)
      this.pop += iserobj.length
    },
     // 插入代码
    addcode (item) {
      const iserobj = ` \n[pre]\n${item}\n[/pre]`
      this.insets(iserobj)
     this.pop += iserobj.length
    },
      // 插入引用yy
    addyy (item) {
      const iserobj = ` \n[quote]\n${item}\n[/quote]`
      this.insets(iserobj)
        this.pop += iserobj.length
    },
    close () {
      this.faceisshow = false
      this.isimgs = false
      this.islink = false
      this.iscode = false
      this.isyy = false
    },
    handelclick (e) {
      e.stopPropagation()
      if (this.$refs.edito.contains(e.target) || this.$refs.icon.contains(e.target)) {
        return false
      }
      this.faceisshow = false
      this.isimgs = false
      this.islink = false
      this.iscode = false
      this.isyy = false
    }
  },
  mounted () {
    console.log(121, this.initcontent)
    this.$nextTick(() => {
      document.querySelector('body').addEventListener('click',
        this.handelclick
      )
    })
    this.codewidth = this.$refs.textEdit.offsetWidth - 160
    this.codeheight = this.$refs.textEdit.offsetHeight
    window.addEventListener('resize', () => {
      this.codewidth = this.$refs.textEdit.offsetWidth - 160
      this.codeheight = this.$refs.textEdit.offsetHeight
      console.log(this.codewidth, this.codeheight)
    })
  },
  beforeDestroy () {
    document.querySelector('body').removeEventListener('click',
      this.handelclick
    )
  }
}
</script>

<style lang="scss" >
.edit-wrap{
  height: 300px;
  position: relative;
 }
 .fly-editor{
    height: 240px;
 }

</style>
