<template>
  <div class="banner">
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item,index) in banner" :key="index"><img :src="item.pic" alt="" @click="openItem(item.id)"></mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
  import { MessageBox } from 'mint-ui'
    export default {
      name: "banner",
      props:['banner','type'],
      components:{
        MessageBox
      },
      data(){
        return{
        }
      },
      methods:{
        openItem(id){
          if (this.type == 'ad'){
            // let that = this
            // if (localStorage.getItem('is_real')==0){
            //   MessageBox.confirm('请完成实名认证').then(action => {
            //     that.$router.push('/mine/realname')
            //   });
            // }else {
              this.$router.push('/business/ad_detail?type=list&id=' + id)
            // }
          }else {
            return false
          }
        }
      }
    }
</script>

<style scoped>
  .banner{
    height: 150px;
  }
</style>
