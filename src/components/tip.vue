<template>
  <div class="tip">
    已发布广告数量：{{num}}
  </div>
</template>

<script>
    export default {
      name: "tip",
      props:['num']
    }
</script>

<style scoped>
  .tip{
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 12px;
    background: #FFF7E5;
    color: #FB7939;
  }
</style>
