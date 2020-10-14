<template>
  <div class="Person">
    <p @click.stop="toLogin">登录</p>
  </div>
</template>

<script>
export default {
  name: 'Person',
  data () {
    return {

    }
  },
  methods: {
    toLogin () {
      sessionStorage.setItem('fromRouteName','Person')
      this.$router.push('Login')
    },
  },
}
</script>

<style lang="less" scoped>
.Person{

}
</style>
