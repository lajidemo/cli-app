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
        <p class="f22">请输入验证码</p>
        <p class="f14">验证码已通过短信发送至 13112345678</p>
      </div>
      <div class="phone">
        <van-password-input
          :value="code"
          :length="4"
          :gutter="15"
          :focused="showKeyboard"
          @focus="showKeyboard = true"
        />
        <!-- 数字键盘 -->
        <van-number-keyboard
          :show="showKeyboard"
          @input="onInput"
          @delete="onDelete"
          @blur="showKeyboard = false"
        />
      </div>
      <van-button
        class="submit"
        native-type="button"
        @click="loginFn"
        block
        round
        type='primary'
        :disabled='!isEnoughCodeLen'>
        登录
      </van-button>
      <p class="reflsh" @click.stop="getCode">重新获取</p>
    </div>
  </div>
</template>

<script>
import { NavBar,PasswordInput,NumberKeyboard,Button } from 'vant'
import utils from '@/utils'

export default {
  name: 'Code',
  components: {
    vanButton: Button,
    vanNavBar: NavBar,
    vanPasswordInput: PasswordInput,
    vanNumberKeyboard: NumberKeyboard,
  },
  data () {
    return {
      fromRouteName: '',
      phone: '',
      code: '',
      showKeyboard: false,
    }
  },
  created () {
    this.phone = this.$route.params.phone || ''
    this.fromRouteName = sessionStorage.getItem('fromRouteName') || 'Home'
  },
  computed: {
    isEnoughCodeLen () {
      return this.code.length === 4
    },
  },
  methods: {
    loginFn () { // 登录
      if (this.isEnoughCodeLen) {
        const params = {
          phone: this.phone,
          code: this.code,
        }
        this.$api.login(params).then((res) => {
          this.$toast.success('登陆成功')
          utils.setCookie(res.cookieStr)
          this.$router.replace(this.fromRouteName)
        })
      }
    },
    onInput (key) {
      this.code = (this.code + key).slice(0,4)
    },
    onDelete () {
      this.code = this.code.slice(0,this.code.length - 1)
    },
    onClickLeft () {
      this.$router.back()
    },
    getCode () { // 重新获取验证码
      this.code = ''
      this.$api.getPhoneCode({ phone: this.phone })
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
