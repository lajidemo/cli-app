<template>
  <div class="hello">
    <Button class="btn">按钮</Button>
  </div>
</template>

<script>
import { Button } from 'vant'
export default {
  name: 'HelloWorld',
  components: {
    Button,
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn{
  font-size: 52px;
}
</style>
