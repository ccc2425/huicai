<template>
    <div>
      <div class="header">
        <i @click="back" class="iconfont icon">&#xe601;</i>
        <p>{{title}}</p>
      </div>
      <div class="zhanwei"></div>
    </div>
</template>

<script>
    export default {
      name: "headerBack",
      props:['title'],
      methods:{
        back(){
          this.$router.go(-1)
        }
      }
    }
</script>

<style scoped>
  .header{
    z-index: 9999;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 15px;
    background: #FFFFFF;
  }
  .icon{
    position: absolute;
    left: 10px;
  }
  .zhanwei{
    height: 50px;
  }
  p{
    font-weight: bold;
  }
</style>
