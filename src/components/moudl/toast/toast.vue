<template>
  <div class="post">
      <span v-text="msg"></span>
  </div>
</template>

<script>
export default {
  props: {
    msg: {
      type: String,
      default: ''
    }
  },
  mounted: {

  },
  methods: {

  }

}
</script>

<style lang="sass" scoped>
.post
    position: fixed
    left: 50%
    top:50%
    width:200px
    height:70
    margin-left:-100px
    margin-right:-35px
    display: flex
    justify-content: center
    align-items: center
    background: rgb(180,180 ,180 )
    color: #ffffff
    border-radius: 5px
    opacity: 0.5
</style>
