<template>
  <div id="root">
    <!-- <keep-alive> -->
    <keep-alive :include="$store.state.common.aliveRouters">
      <router-view/>
    </keep-alive>
    <p class="b-tabbar-bg"></p>
    <tabbar v-model="active" class="b-tabbar">
      <tabbar-item v-for="el in routerList" :key="el.router"
        :icon="el.icon" @click.stop="jump(el.router,el.index)"
      >{{el.routerName}}</tabbar-item>
      <!-- <tabbar-item icon="wap-home" @click.stop="jump('/Home')">首页</tabbar-item>
      <tabbar-item icon="bars" @click.stop="jump('/Classify')">分类</tabbar-item>
      <tabbar-item icon="eye" @click.stop="jump('/Find')">发现</tabbar-item>
      <tabbar-item icon="shopping-cart" @click.stop="jump('/Car')">购物车</tabbar-item>
      <tabbar-item icon="friends" @click.stop="jump('/Person')">我的</tabbar-item> -->
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
      routerList: [
        { index: 0,icon: 'wap-home',router: 'Home',routerName: '首页' },
        { index: 1,icon: 'bars',router: 'Classify',routerName: '分类' },
        { index: 2,icon: 'eye',router: 'Find',routerName: '发现' },
        { index: 3,icon: 'shopping-cart',router: 'Car',routerName: '购物车' },
        { index: 4,icon: 'friends',router: 'Person',routerName: '我的' },
      ],
    }
  },
  created () {
    this.routerActive()
  },
  mounted () {
  },
  methods: {
    routerActive () {
      const hashName = location.hash.split('/')[1]
      const router = this.routerList.filter(el => {
        return el.router === hashName
      })
      this.active = router.length ? router[0].index : 0
    },
    jump (routerName,index) {
      this.$router.push(`/${routerName}`)
      this.active = index
    },
  },
}
</script>

<style lang="less">
.b-tabbar{
  z-index: 10;
}
.b-tabbar-bg{
  height: 50px;
}
.fixed100{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
}
.h-padding16{
  padding-left: 16px;
  padding-right: 16px;
}
.v-padding16{
  padding-top: 16px;
  padding-bottom: 16px;
}
.padding16{
  padding: 16px;
}
</style>
