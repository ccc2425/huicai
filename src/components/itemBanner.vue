<template>
  <div class="banner pr">
    <mt-swipe :auto="4000" @change="handleChange">
      <mt-swipe-item v-for="(item,index) in banner" :key="index"><img :src="item" alt=""></mt-swipe-item>
    </mt-swipe>
    <span class="suoyin">{{banndeIndex}}/{{banner.length}}</span>
  </div>
</template>

<script>
    export default {
      name: "itemBanner",
      props:['banner'],
      data(){
        return{
          banndeIndex:1
        }
      },
      methods:{
        handleChange(index) {
          this.banndeIndex = index + 1
        }
      }
    }
</script>

<style scoped>
  .banner{
    height: 375px;
  }
  .suoyin{
    position: absolute;
    bottom: 15px;
    right: 0;
    padding: 0 12px;
    line-height: 27px;
    background: rgba(0,0,0,.6);
    color: #FFFFFF;
    border-radius: 27px 0 0 27px;
  }
</style>
