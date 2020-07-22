<template>
  <div class="Loading">
    <p>加载中...</p>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  data () {
    return {

    }
  },
}
</script>

<style lang="less" scoped>
  .Loading{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
