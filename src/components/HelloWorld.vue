<template>
  <div class="hello">
    <Button type="primary" size="mini" class="btn" @click="toast">按钮</Button>
  </div>
</template>

<script>
import { Button } from 'vant'
export default {
  name: 'HelloWorld',
  components: {
    Button
  },
  props: {
    msg: String
  },
  methods: {
    toast () {
      this.$notify({
        message: '自定义颜色',
        color: '#ad0000',
        background: '#ffe1e1'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn {
  /* font-size: 1.333333rem; */
}
</style>
