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
          :value="value"
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
        block
        round
        color='#bbb'>
        登录
      </van-button>
      <p class="reflsh">重新获取</p>
    </div>
  </div>
</template>

<script>
import { NavBar,PasswordInput,NumberKeyboard,Button } from 'vant'
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
      value: '',
      showKeyboard: false,
    }
  },
  methods: {
    onInput (key) {
      this.value = (this.value + key).slice(0,6)
    },
    onDelete () {
      this.value = this.value.slice(0,this.value.length - 1)
    },
    onClickLeft () {
      this.$router.back()
    },
  },
}
</script>

<style lang="less" scoped>
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
    color: blue;
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
