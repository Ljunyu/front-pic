<template>
  <div class="contents">
      <div class="layui-content layui-row layuispace20">
          <div class="texts">
             <p class="sans">Hi,Admin,你已经是我们的正式会员了</p>
          </div>
          <div class="cont">
            <div class="left">
              <div class="msgs">我的会员信息</div>
              <div class="info">
                <div style='margin-top:10px'>积分经验：{{userinfo.favs}}</div>
                <div style='margin-top:10px'>您当前为：<span>{{userinfo.isvip === '0'?'非VIP':'VIP'+userinfo.isvip}}</span></div>
              </div>
            </div>
             <div class="right">
                <sign></sign>
            </div>
          </div>
      </div>
      <div class="dibucontent">
        <div class="bottms">
          <div class="infokj">
            <div class="tubiao">
                <i class="layui-icon layui-icon-set"></i>
            </div>
            <div class="tubiao">
              密码修改
            </div>
          </div>
          <div class="infokj">
            <div class="tubiao">
                <i class="layui-icon layui-icon-service"></i>
            </div>
            <div class="tubiao">
              禁言申诉
            </div>
          </div>
           <div class="infokj">
            <div class="tubiao">
                <i class="layui-icon layui-icon-app"></i>
            </div>
            <div class="tubiao">
              管理帖子
            </div>
          </div>
           <div class="infokj">
            <div class="tubiao">
                <i class="layui-icon layui-icon-set"></i>
            </div>
            <div class="tubiao">
              密码修改
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import sign from '../../components/sidebar/Sign'
import { getinfo } from '../../api/user'
export default {
  name: 'centers',
  components: {
    sign
  },
  computed: {
    userinfo () {
      return this.$store.state.userinfo
    }
  },
  data () {
    return {
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      getinfo({}).then((res) => {
        if (res.code === 200) {
          this.$store.commit('setuserinfo', res.data)
        }
        console.log(res)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tubiao .layui-icon{
    font-size: 30px!important
}
  .contents{
    margin:0px 0px 10px 225px;
    background-color: #ffffff;
    font-size: 16px;
  }
  .texts{
    margin: 0px 10px;
    padding:10px 15px;
    margin-bottom: 20px;
  }
  .sans{
    background-color: #f8f8ff;
    border-radius: 5px;
    padding:10px;
  }
  .cont{
    margin-left:20px ;
    display: flex;
    flex-wrap: wrap;
  }
  .left{
    width: 300px;
    height: 137px;
    margin: 10px;
    border: 1px solid #f8f8ff;

  }
  .right{
    width: 300px;
     margin: 10px;
     height: 137px;
     border: 1px solid #f8f8ff;
  }
  .msgs{
    padding: 10px;
    font-size: 14px;
    border-bottom: 1px solid #f8f8ff;
  }
  .info{
    display: flex;
    justify-content: center;
    font-size: 14px;
    margin: 20px 10px;
    flex-direction: column;
  }
  .bottms{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
  .dibucontent{
    margin-left:20px ;
    border: 1px solid #f8f8ff;

  }
  .infokj{
    margin: 3px;
     background-color: rgb(46, 192, 218);
    width: 32%;
    &:hover{
         background-color: rgb(49, 210, 238);
    }
  }
  .tubiao{

    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

  }

</style>
