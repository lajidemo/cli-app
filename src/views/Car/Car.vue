<template>
  <div class="Car">
    Car
    <p>{{common.aliveRouters}}</p>
  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'

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
    ...mapMutations(['updateAliveRouters']),
  },
  created () {
    console.log(this.$store)
    this.updateAliveRouters({ action: 'add',router: 'aaaa' })
    this.$store.commit('updateAliveRouters',{ action: 'add',router: 'bbbbb' })
    const aliveRouters = this.$store.state.common.aliveRouters
    console.log('aliveRouters==',aliveRouters)
    this.$nextTick(() => {
      console.log('aliveRouters===',this.common.aliveRouters)
    })
  },
}
</script>

<style lang="less" scoped>
.Car{

}
</style>
