<template>
  <div id="app">
    <!-- <keep-alive> -->
    <keep-alive :include="$store.state.common.aliveRouters">
      <router-view/>
    </keep-alive>
    <tabbar v-model="active">
      <tabbar-item icon="wap-home" @click.stop="jump('/Home')">首页</tabbar-item>
      <tabbar-item icon="bars" @click.stop="jump('/Classify')">分类</tabbar-item>
      <tabbar-item icon="eye" @click.stop="jump('/Find')">发现</tabbar-item>
      <tabbar-item icon="shopping-cart" @click.stop="jump('/Car')">购物车</tabbar-item>
      <tabbar-item icon="friends" @click.stop="jump('/Person')">我的</tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Tabbar,TabbarItem } from 'vant'
export default {
  components: {
    Tabbar,
    TabbarItem,
  },
  data () {
    return {
      active: 0,
    }
  },
  created () {
  },
  methods: {
    jump (routerName) {
      this.$router.push(routerName)
    },
  },
}
</script>

<style>

</style>
