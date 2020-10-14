<template>
  <div class="Code fixed100">
    <van-nav-bar
      title=""
      :border='false'
      @click-left="onClickLeft"
    >
    <!-- 具名插槽 v-slot 只能添加在 <template> 上，除非只有默认插槽才可不用 -->
      <template #left>
        <van-icon name="arrow-left" size="20"/>
      </template>
    </van-nav-bar>
    <div class="con">
      <div class="title">
        <p class="f22">设置新密码</p>
      </div>
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
            v-model="sms"
            center
            clearable
            :border='false'
            placeholder="请输入短信验证码"
          >
            <template #button>
              <van-button
                native-type="button"
                :disabled='!canGetCode'
                size="small"
                type="primary"
                @click="getCode">{{codeMsg}}</van-button>
            </template>
          </van-field>
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
  </div>
</template>

<script>
import { Field,Button,Form,NavBar } from 'vant'
import utils from '@/utils'

export default {
  name: 'FindPsw',
  components: {
    vanForm: Form,
    vanField: Field,
    vanButton: Button,
    vanNavBar: NavBar,
  },
  data () {
    return {
      fromRouteName: '',
      phone: '',
      sms: '',
      psw: '',
      codeMsg: '发送验证码',
      timeFlag: true,
    }
  },
  created () {
    this.fromRouteName = sessionStorage.getItem('fromRouteName') || 'Home'
  },
  computed: {
    canSubmitLogin () {
      return this.phone && this.sms && this.psw
    },
    canGetCode () {
      return utils.phoneTest(this.phone) && this.timeFlag
    },
  },
  methods: {
    validatorPhone (val) { // 校验手机号
      return utils.phoneTest(val)
    },
    getCode () { // 获取验证码
      if (this.timeFlag) {
        this.$api.getPhoneCode({ phone: this.phone }).then(() => {
          this.timeFlag = false
          let timeNum = 60
          this.codeMsg = `重新发送(${timeNum}s)`
          const timer = setInterval(() => {
            --timeNum
            this.codeMsg = `重新发送(${timeNum}s)`
            if (timeNum === 0) {
              this.codeMsg = `重新发送`
              this.timeFlag = true
              clearInterval(timer)
            }
          },1000)
        })
      }
    },
    loginFn () { // 登录
      const params = {
        phone: this.phone,
        sms: this.sms,
        psw: this.psw,
      }
      this.$api.login(params).then((res) => {
        this.$toast.success('设置成功')
        utils.setCookie(res.cookieStr)
        this.$router.replace(this.fromRouteName)
      })
    },
    onClickLeft () {
      this.$router.back()
    },
  },
}
</script>

<style lang="less" scoped>
@import url('@/assets/css/globalVar');
.f22{
  font-size: 22px;
}
.f14{
  font-size: 14px;
}
.Code{
  height: 100%;
  background-color: #fff;
  .con{
    padding: 16px 32px;
    .title{
      margin-bottom: 16px;
    }
  }
  .reflsh{
    text-align: center;
    color: @blue;
    margin-top: 16px;
  }
}
.submit{
  margin-top: 32px;
}
.van-password-input__security li{
  background-color: #eee;
}
</style>
