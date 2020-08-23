<template>
  <div class="Login fixed100">
    <div class="submit" @click.stop="loginFn">登录</div>
  </div>
</template>

<script>
import utils from '@/utils'
export default {
  name: 'Login',
  data () {
    return {

    }
  },
  methods: {
    loginFn () {
      this.$api.login().then(res => {
        console.log('res===',res)
        utils.toggleLoginState(true)
        this.$router.back()
      })
    },
  },
}
</script>

<style lang="less" scoped>
.Login{
  background-color: #fff;
}
</style>
