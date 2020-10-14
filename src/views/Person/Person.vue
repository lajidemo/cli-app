<template>
  <div class="Person">
    <input type="text" v-model="val">
    <p @click.stop="toLogin">登录</p>
  </div>
</template>

<script>
export default {
  name: 'Person',
  data () {
    return {
      val: '',
    }
  },
  methods: {
    toLogin () {
      sessionStorage.setItem('fromRouteName','Person')
      this.$router.replace('Login')
    },
  },
}
</script>

<style lang="less" scoped>
.Person{

}
</style>
