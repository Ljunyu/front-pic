<template>
   <div class="layui-container">
          <div class="layui-row layui-col-space15">
              <div class="layui-col-md8">
                <Top></Top>
                  <List></List>
              </div>
              <div class="layui-col-md4">
                  <Tips></Tips>
                  <Sign></Sign>
                  <HostList></HostList>
                  <Ads></Ads>
                  <Links></Links>
              </div>
          </div>
    </div>
</template>

<script>
import Ads from '../../components/sidebar/Ads'
import HostList from '../../components/sidebar/HostList'
import Links from '../../components/sidebar/Links'
import Sign from '../../components/sidebar/Sign'
import Tips from '../../components/sidebar/Tips'
import List from '../../components/contents/list'
import Top from '../../components/contents/top'
export default {
  name: 'Index',
  components: {
    Ads,
    HostList,
    Links,
    Sign,
    Tips,
    List,
    Top
  }
}
</script>

<style lang="sass" scoped>

</style>
