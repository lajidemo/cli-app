<template>
  <div class="Car">
    <p>Car</p>
    <p @click="jump">{{common.aliveRouters}}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Car',
  data () {
    return {

    }
  },
  computed: {
    ...mapState(['common']),
  },
  methods: {
    jump () {
      this.$router.push('/Car/Car1')
    },
  },
  created () {
    this.$api.apiLogin().then(res => {
      console.log('res===',res)
    })
  },
}
</script>

<style lang="less" scoped>
.Car{

}
</style>
