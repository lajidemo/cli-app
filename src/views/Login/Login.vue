<template>
  <div class="Login fixed100">
    <div class="close">
      <van-icon name="cross" />
    </div>
    <div class="body">
      <p>手机验证码登录</p>
      <p>登录即表明同意 <span>用户协议</span> 和 <span>隐私政策</span></p>
      <div class="phoneLogin">
        <div class="phone">
          <input type="number" v-model.number="phone">
          <p>未注册的手机号验证通过后将自动注册</p>
        </div>
        <div class="submit" @click.stop="loginFn">获取短信验证码</div>
      </div>
      <div class="pswLogin">
        <div class="phone">
          <input type="number" v-model.number="phone">
          <input type="password" v-model="psw">
        </div>
        <div class="submit" @click.stop="loginFn">登录</div>
      </div>
      <p class="toggleLogin">密码登录</p>
    </div>
  </div>
</template>

<script>
import utils from '@/utils'
export default {
  name: 'Login',
  data () {
    return {
      fromRouteName: '',
    }
  },
  beforeRouteEnter (to,from,next) {
    next((vm) => {
      vm.fromRouteName = from.name
    })
  },
  methods: {
    loginFn () {
      this.$api.login().then(res => {
        console.log('res===',res)
        utils.toggleLoginState('Y')
        if (this.fromRouteName) {
          this.$router.replace(this.fromRouteName)
        } else {
          this.$router.replace('Home')
        }
        // this.$router.back()
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
