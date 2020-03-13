<template>
  <div class="banner">
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item,index) in banner" :key="index"><img :src="item.img" alt=""></mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
    export default {
      name: "banner",
      data(){
        return{
          banner:[
            {img:require('../assets/image/ban.png')},
            {img:require('../assets/image/ban.png')},
            {img:require('../assets/image/ban.png')}
          ],
        }
      }
    }
</script>

<style scoped>
  .banner{
    height: 150px;
  }
</style>
