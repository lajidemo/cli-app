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
        <span v-if="isCodeLogin">手机验证码登录</span>
        <span v-else>手机号密码登录</span>
      </p>
      <p class="agreement">登录即表明同意 <span>用户协议</span> 和 <span>隐私政策</span></p>
      <!-- 验证码登录 -->
      <div class="codeLogin" v-if="isCodeLogin">
        <van-form validate-first @submit="getCode">
          <div class="phone">
            <van-field
              class="ph"
              v-model.trim="phone"
              type="tel"
              maxlength="11"
              :border='false'
              :rules="[{ validator:validatorPhone, message: '请输入正确手机号' }]"
              placeholder="请输入手机号" />
            <!-- <input type="number" v-model.number="phone"> -->
            <p>未注册的手机号验证通过后将自动注册</p>
          </div>
          <van-button
            class="submit"
            block
            round
            type='primary'
            :disabled='!isEnoughphoneLen'>
            获取短信验证码
          </van-button>
        </van-form>
      </div>
      <!-- 密码登录 -->
      <div class="pswLogin" v-else>
        <van-form validate-first @submit="loginFn">
          <div class="phone">
            <van-field
              class="ph"
              v-model.trim="phone"
              type="tel"
              maxlength="11"
              :border='false'
              :rules="[{ validator:validatorPhone, message: '请输入正确手机号' }]"
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
            block
            round
            type='primary'
            :disabled='!canSubmitLogin'>
            登录
          </van-button>
        </van-form>
      </div>
      <div class="toggleLogin">
        <p class="" @click.stop="toggleLogin" v-show="isCodeLogin">密码登录</p>
        <p class="" @click.stop="toggleLogin" v-show="!isCodeLogin">验证码登录</p>
        <p class="" @click.stop="forgetPsw" v-show="!isCodeLogin">忘记密码</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Field,Button,Form,NavBar } from 'vant'
import utils from '@/utils'

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
      isCodeLogin: true,
      fromRouteName: '',
      phone: '',
      psw: '',
    }
  },
  created () {
    this.fromRouteName = sessionStorage.getItem('fromRouteName') || 'Home'
  },
  computed: {
    isEnoughphoneLen () {
      return /\d{11}/.test(this.phone)
    },
    canSubmitLogin () {
      return this.isEnoughphoneLen && this.psw
    },
  },
  methods: {
    validatorPhone (val) { // 校验手机号
      return utils.phoneTest(val)
    },
    onClickLeft () {
      this.$router.back()
    },
    getCode () { // 发送验证码接口
      if (this.isEnoughphoneLen) {
        this.$api.getPhoneCode({ phone: this.phone }).then(() => {
          this.$router.push({
            name: 'Code',
            params: { phone: this.phone },
          })
        })
      }
    },
    toggleLogin () { // 切换登录方式
      this.isCodeLogin = !this.isCodeLogin
    },
    forgetPsw () {
      this.$router.push('FindPsw')
    },
    loginFn () { // 登录
      if (this.canSubmitLogin) {
        const params = {
          phone: this.phone,
          psw: this.psw,
        }
        this.$api.login(params).then(res => {
          this.$toast.success('登陆成功')
          utils.setCookie(res.cookieStr)
          this.$router.replace(this.fromRouteName)
        })
      }
    },
  },
}
</script>

<style lang="less" scoped>
@import url('@/assets/css/globalVar');
@size14: 14px;
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
