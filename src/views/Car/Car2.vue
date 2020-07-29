<template>
  <div class="Car">
    <p @click="back">Car2</p>
    <p>{{common.aliveRouters}}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Car2',
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
