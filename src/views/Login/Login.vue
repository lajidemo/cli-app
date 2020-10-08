<template>
  <div class="Login fixed100">
    <div class="close">
    <van-nav-bar
      title=""
      :border='false'
      @click-left="onClickLeft"
    >
      <template #left>
        <van-icon name="cross" size="20"/>
      </template>
    </van-nav-bar>
    </div>
    <div class="body">
      <p class="title">
        <span v-if="isCdeLogin">手机验证码登录</span>
        <span v-else>手机号密码登录</span>
      </p>
      <p class="agreement">登录即表明同意 <span>用户协议</span> 和 <span>隐私政策</span></p>
      <div class="codeLogin" v-if="isCdeLogin">
        <van-form validate-first @failed="onFailed" @submit="getCode">
          <div class="phone">
            <van-field
              class="ph"
              v-model="phone"
              type="tel"
              :border='false'
              :rules="[{ pattern, message: '请输入正确手机号' }]"
              placeholder="请输入手机号" />
            <!-- <input type="number" v-model.number="phone"> -->
            <p>未注册的手机号验证通过后将自动注册</p>
          </div>
          <van-button
            class="submit"
            block
            round
            type="info"
            color='#bbb'>
            获取短信验证码
          </van-button>
        </van-form>
      </div>
      <div class="pswLogin" v-else>
        <van-form validate-first @failed="onFailed" @submit="loginFn">
          <div class="phone">
            <van-field
              class="ph"
              v-model="phone"
              type="tel"
              :border='false'
              :rules="[{ pattern, message: '请输入正确手机号' }]"
              placeholder="请输入手机号" />
            <van-field
              class="ph"
              v-model="psw"
              type="password"
              :border='false'
              placeholder="请输入密码" />
          </div>
          <van-button
            class="submit"
            :block='true'
            round type="info"
            color='#bbb'>
            登录
          </van-button>
        </van-form>
      </div>
      <div class="toggleLogin">
        <p class="" @click.stop="toggleLogin" v-show="isCdeLogin">密码登录</p>
        <p class="" @click.stop="toggleLogin" v-show="!isCdeLogin">验证码登录</p>
        <p class="" @click.stop="forgetPsw" v-show="!isCdeLogin">忘记密码</p>
      </div>
    </div>
  </div>
</template>

<script>
import utils from '@/utils'
import { Field,Button,Form,NavBar } from 'vant'
export default {
  name: 'Login',
  components: {
    vanField: Field,
    vanButton: Button,
    vanForm: Form,
    vanNavBar: NavBar,
  },
  data () {
    return {
      isCdeLogin: true,
      fromRouteName: '',
      phone: '',
      psw: '',
      pattern: /\d{11}/,
    }
  },
  beforeRouteEnter (to,from,next) {
    next((vm) => {
      vm.fromRouteName = from.name
    })
  },
  methods: {
    onClickLeft () {

    },
    onFailed () {
      console.log('校验不通过')
    },
    getCode () {
      console.log('获取验证码')
      this.$router.push('Code')
    },
    toggleLogin () {
      this.isCdeLogin = !this.isCdeLogin
    },
    forgetPsw () {

    },
    loginFn () {
      this.$api.login().then(res => {
        console.log('res===',res)
        utils.toggleLoginState('Y')
        if (this.fromRouteName) {
          this.$router.replace(this.fromRouteName)
        } else {
          this.$router.replace('Home')
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
@size14: 14px;
@blue: blue;
.Login{
  background-color: #fff;
  // .close{
  //   padding: 16px 16px;
  // }
  .body{
    margin: 8px 24px;
    .title{
      font-size: 20px;
    }
    .agreement{
      font-size: @size14;
      span{
        color: @blue;
      }
    }
    .phone{
      .ph{
        background-color: #f8f8f8;
        border-radius: 20px;
        font-size: 16px;
        margin: 20px auto 10px;
      }
      p{
        font-size: @size14;
      }
    }
    .submit{
      margin: 16px auto 8px;
    }
    .toggleLogin{
      font-size: @size14;
      color: @blue;
    }
  }
}
</style>
