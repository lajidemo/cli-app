<template>
  <div class="Car">
    <p @click="back">Car1</p>
    <p @click="jump">{{common.aliveRouters}}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Car1',
  data () {
    return {

    }
  },
  computed: {
    ...mapState(['common']),
  },
  methods: {
    back () {
      this.$router.back()
    },
    jump () {
      this.$router.push('/Car2')
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
