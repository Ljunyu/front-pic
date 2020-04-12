<template>
<div>
  <Panel></Panel>
      <div class="layui-container">
          <div class="layui-row layui-col-space15">
              <div class="layui-col-md8">
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
</div>
</template>

<script>
import Panel from '../components/Panel'
import Ads from '../components/sidebar/Ads'
import HostList from '../components/sidebar/HostList'
import Links from '../components/sidebar/Links'
import Sign from '../components/sidebar/Sign'
import Tips from '../components/sidebar/Tips'
import List from '../components/contents/list'
export default {
  name: 'home',
  components: {
    Panel,
    Ads,
    HostList,
    Links,
    Sign,
    Tips,
    List
  }

}
</script>

<style lang="scss" scoped>

</style>
