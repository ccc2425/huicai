<template>
  <div>
    <div class="tishi" v-if="tishiShow">{{tishi}}</div>
  </div>
<!--    <div class="tishi" v-if="!tishiShow">{{tishi}}</div>-->
</template>

<script>
    export default {
      name: "tishi",
      props:['tishi','tishiShow'],
    }
</script>

<style scoped>
  .tishi{
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: 3px 10px;
    line-height: 20px;
    background: rgba(0,0,0,0.6);
    color: #ffffff;
    border-radius: 3px;
    text-align: center;
    font-size: 12px;
  }
</style>
