<template>
<div>
  <Panel></Panel>
  <router-view></router-view>
</div>
</template>

<script>
import Panel from '../components/Panel'
export default {
  name: 'home',
  components: {
    Panel
  },
  data () {
    return {

    }
  },
  methods: {

  },
  mounted () {
  }

}
</script>

<style lang="scss" scoped>

</style>
