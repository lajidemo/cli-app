<template>
  <div class="Home">
    <p @click="addCar">Home</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Home',
  data () {
    return {

    }
  },
  created () {
    this.$api.apiLogin().then(res => {
      console.log('res===',res)
    })
  },
  methods: {
    ...mapActions('common',['addCars']),
    addCar () {
      this.addCars(this)
    },
  },
}
</script>

<style lang="less" scoped>
.Home{

}
</style>
