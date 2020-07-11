<template>
<div class="layui-container fly-marginTop">
  <div class="fly-panel" pad20 style="padding-top: 5px;">
    <!--<div class="fly-none">没有权限</div>-->
    <div class="layui-form layui-form-pane">
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li class="layui-this">发表新帖<!-- 编辑帖子 --></li>
        </ul>
        <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
          <div class="layui-tab-item layui-show">
           <validation-observer ref="observer" v-slot="{ validate }" >
              <div class="layui-row layui-col-space15 layui-form-item">
                <div class="layui-col-md3">
                  <label class="layui-form-label">所在专栏</label>
                  <ValidationProvider rules="required"  v-slot="{errors}">
                  <div class="layui-input-block  layui-unselect layui-form-select"
                   @click="()=>{cateishow=!cateishow}" :class="{'layui-form-selected':cateishow}">
                          <input
                             placeholder="请选择"
                            readonly
                            name="类别"
                            v-model="catelogs[cateindex].text"
                            class="layui-input layui-unselect"
                            />
                             <i class="layui-edge"></i>
                      <dl class="layui-anim layui-anim-upbit" v-show="cateishow" >
                          <dd v-for="(item,index) in catelogs" @click="changecate(index)" :key="index" :class="{'layui-this':index===cateindex}">
                                {{item.text}}
                          </dd>
                      </dl>
                  </div>
                     <div class="layui-form-mid">
                        <span style="color: #c00;">{{errors[0]}}</span>
                      </div>
                  </ValidationProvider>
                </div>
                <div class="layui-col-md9">
                  <label for="L_title" class="layui-form-label">帖子标题</label>
                    <ValidationProvider  rules="required" v-slot="{errors}">
                      <div class="layui-input-block" style="display:flex">
                        <input type="text" id="L_title" v-model='title' name="标题"
                        required  class="layui-input">
                        <!-- <input type="hidden" name="id" value="{{d.edit.id}}"> -->
                      </div>
                      <div class="layui-form-mid">
                        <span style="color: #c00;">{{errors[0]}}</span>
                      </div>
                  </ValidationProvider>
                </div>
              </div>
              <editor @contents="add"></editor>
              <!-- <div class="layui-form-item layui-form-text">
                <div class="layui-input-block">
                  <textarea id="L_content" name="content" required lay-verify="required" placeholder="详细描述" class="layui-textarea fly-editor" style="height: 260px;"></textarea>
                </div>
              </div> -->
              <div class="layui-form-item">
                <div class="layui-inline">
                  <label class="layui-form-label">悬赏飞吻</label>
                  <div class="layui-input-block layui-unselect layui-form-select"
                   @click="()=>{favshow=!favshow}" :class="{'layui-form-selected':favshow}">
                      <div class="layui-select-title">
                          <input
                             placeholder="请选择"
                            readonly
                            v-model="favs[favindex]"
                            class="layui-input layui-unselect"
                            />
                               <i class="layui-edge"></i>
                      </div>

                      <dl class="layui-anim layui-anim-upbit" v-show="favshow" >
                          <dd v-for="(item,index) in favs" @click="changefav(index)" :key="index" :class="{'layui-this':index===favindex}">
                                {{item}}
                          </dd>
                      </dl>
                  </div>
                  <div class="layui-form-mid layui-word-aux">发表后无法更改飞吻</div>
                </div>
              </div>
            <div class="layui-form-item">
                  <div class="layui-row">
                    <label for="L_vercode" class="layui-form-label">验证码</label>
                    <ValidationProvider  rules="required" v-slot="{errors}">
                     <div class="layui-input-inline">
                      <input
                        type="text"
                        name="验证码"
                        v-model="code"
                        placeholder="请输入验证码"
                        autocomplete="off"
                        class="layui-input"
                      />

                    </div>
                     <div class="layui-form-mid">
                        <span style="color: #c00;">{{errors[0]}}</span>
                      </div>
                       </ValidationProvider>
                    <div class>
                      <span class="svg" style="color: #c00;" @click="_getCode()" v-html="svg"></span>
                    </div>
                  </div>
                  <div class="layui-form-mid">
                    <span style="color: #c00;"></span>
                  </div>
                </div>
              <div class="layui-form-item">
                <button class="layui-btn" @click="validate().then(sumbit)"  lay-submit>立即发布</button>
              </div>
            </validation-observer>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import editor from './moudl/editor/index'
import Codemix from '../mixin/code'
import { addpost } from '../api/content'
export default {
  name: 'addposts',
  mixins: [
    Codemix
  ],
  components: {
    editor
  },
  data () {
    return {
      title: '',
      cateishow: false,
      favshow: false,
      cateindex: 0,
      favindex: 0,
      catelogs: [
        { text: '请选择', value: '' },
        { text: '提问', value: 'ask' },
        { text: '分享', value: 'share' },
        { text: '讨论', value: 'discuss' },
        { text: '建议', value: 'advise' }
      ],
      favs: [20, 40, 60, 80],
      content: ''
    }
  },
  mounted () {

  },
  methods: {
    async  sumbit () {
      const isValid = await this.$refs.observer.validate()
      console.log(isValid)
      if (!isValid) {
        return false
      }
      if (this.content.trim() === '') {
        return this.$alert('请填写内容')
      }
     addpost({
       title: this.title,
       catalog: this.catelogs[this.cateindex].value,
       fav: this.favs[this.favindex],
       content: this.content,
       code: this.code,
       sid: this.$store.state.sid
     }).then((res) => {
       console.log(res)
       if (res.code === 200) {
         this.$alert('发表成功，两秒后跳转到首页')
         setTimeout(() => {
           this.$router.push('/')
         }, 2000)
       }
     })
    },
    changecate (index) {
      this.cateindex = index
      console.log(this.cateindex)
    },
    changefav (index) {
      this.favindex = index
    },
    add (val) {
      this.content = val
      console.log(112111, val)
    }

  }
}
</script>

<style>
.layui-form-pane .layui-input-block{
}
</style>
