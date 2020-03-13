<template>
    <div>
      <div class="header">
        <div class="head_img_l"><img src="../assets/image/h1.png" alt=""></div>
        <p>商圈</p>
        <div class="head_img_r" @click="openAD"><img src="../assets/image/h2.png" alt=""></div>
      </div>
      <div class="zhanwei"></div>
      <banner></banner>
      <div class="work">今日广告浏览任务：3</div>
      <div class="box">
        <list></list>
      </div>
    </div>
</template>

<script>
    import list from "../components/list"
    import banner from "../components/banner"
    export default {
      name: "business",
      components:{
          list,
          banner
      },
      data(){
          return{
            // banner:[
            //   {img:require('../assets/image/ban.png')},
            //   {img:require('../assets/image/ban.png')},
            //   {img:require('../assets/image/ban.png')}
            // ],
          }
      },
      methods:{
        openAD(){
          this.$router.push('/business/myad')
        }
      }
    }
</script>

<style scoped>
  .header{
    z-index: 99999;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 45px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    line-height: 45px;
    background: #ffffff;
  }
  .header div{
    position: absolute;
    top: 4px;
    height: 21px;
  }
  .head_img_l{
    width: 43px;
    left: 10px;
  }
  .head_img_r{
    width: 20px;
    right: 15px;
  }
  .zhanwei{
    width: 100%;
    height: 45px;
  }
  .work{
    height: 30px;
    line-height: 30px;
    color: #FB7939;
    text-align: center;
    background: #ffffff;
  }
  .box{
    padding-bottom: 50px;
  }

</style>
