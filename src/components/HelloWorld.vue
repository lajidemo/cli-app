<template>
  <div class="hello">
    <Button type="primary">按钮</Button>
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
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
