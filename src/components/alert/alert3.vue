<template>
  <div class="bg">
    <div class="alert">
      <img @click="sure" class="cansel" src="../../assets/image/i3.png" alt="">
      <div class="title">交易提示</div>
      <div class="tishi">
        <img v-if="state == 1" src="../../assets/image/i7.png" alt="">
        <img v-if="state == 2" src="../../assets/image/i1.png" alt="">
        <img v-if="state == 3" src="../../assets/image/i2.png" alt="">
        <img v-if="state == 4" src="../../assets/image/i7.png" alt="">
      </div>
      <div v-if="tishi" class="text">本次交易密码为<span>{{text}}</span>,请立即告知接收方。</div>
      <div v-if="!tishi" class="text">{{text}}</div>
      <div class="btns" @click="sure">确定</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "alert3",
    props:['text','state','tishi'],
    methods:{
      sure(){
        if (this.tishi){
          this.$emit('getAlert','sucess')
        } else {
          this.$emit('getAlert',false)
        }
      },
    }
  }
</script>

<style scoped>
  .bg{
    position: fixed;
    top: 45px;
    left: 0;
    width: 100%;
    height: calc(100vh - 45px);
    background: rgba(0,0,0,.6);
  }
  .alert{
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 300px;
    background: #ffffff;
    border-radius: 6px;
    padding: 17px 20px;
    text-align: center;
  }
  .cansel{
    position: absolute;
    top: 0;
    right: 0;
    width: 33px;
    height: 33px;
  }
  .title{
    font-size: 15px;
    text-align: center;
    font-weight: bold;
    margin-bottom: 15px;
    margin-top: 5px;
  }
  .tishi{
    width: 40px;
    height: 40px;
    margin: 0 auto 18px;
  }
  .text{
    margin-bottom: 24px;
  }
  .btns{
    font-size: 16px;
    line-height: 35px;
    width: 250px;
    border-radius: 6px;
    background: linear-gradient(to right,#F7AB30,#FA7624);
    color: #FFFFFF;
  }
  .text span{
    color: #FA7624;
  }
</style>
