<template>
  <div>
    <div class="header">
      <i @click="back" class="iconfont icon_l">&#xe601;</i>
      <p>{{title}}</p>
      <i class="iconfont icon_r" @click="share">&#xe61f;</i>
    </div>
    <div class="zhanwei"></div>
  </div>
</template>

<script>
    export default {
      name: "headerShare",
      props:['title'],
      methods:{
        back(){
          this.$router.go(-1)
        },
        share(){

        }
      }
    }
</script>

<style scoped>
  .header{
    z-index: 999;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 15px;
    color: #333333;
    font-weight: bold;
    background: #ffffff;
  }
  .header .iconfont,.header span{
    position: absolute;
    top: 0;
    font-weight: normal;
  }
  .icon_l{
    font-size: 20px;
    left: 10px;
  }
  .icon_r{
    right: 16px;
  }
  .zhanwei{
    height: 45px;
  }
</style>
