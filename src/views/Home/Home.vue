<template>
  <div class="Home">
    Home
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {

    }
  },
  created () {
    this.$api.apiLogin().then(res => {
      console.log('res===',res)
    })
  },
}
</script>

<style lang="less" scoped>
.Home{

}
</style>
