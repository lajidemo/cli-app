<template>
  <div class="Login fixed100">
    <div class="submit" @click.stop="loginFn">登录</div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {

    }
  },
  methods: {
    ...mapMutations('common',['toggleLoginState']),
    loginFn () {
      this.toggleLoginState(true)
      this.$router.back()
    },
  },
}
</script>

<style lang="less" scoped>
.Login{
  background-color: #fff;
}
</style>
