<template>
   <div class="layui-container">
          <div class="layui-row layui-col-space15">
              <div class="layui-col-md8">
                  <List></List>
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
import Ads from '../../components/sidebar/Ads'
import HostList from '../../components/sidebar/HostList'
import Links from '../../components/sidebar/Links'
import List from '../../components/contents/list'
export default {
  name: 'tem1',
  components: {
    Ads,
    HostList,
    Links,
    List
  }
}
</script>

<style lang="sass" scoped>

</style>
