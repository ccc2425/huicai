<template>
    <div class="bg">
      <div class="alert">
        <div class="title">提示</div>
        <div class="text">{{text}}</div>
        <div class="btns">
          <div class="btn_cansel" @click="cansel">取消</div>
          <div class="btn_sure" @click="sure">确定</div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "alert1",
      props:['text','ad_id'],
      methods:{
        cansel(){
          this.$emit('getAlert1',false)
        },
        sure(){
          this.$emit('getAlert1',true)
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
  }
  .title{
    font-size: 17px;
    text-align: center;
    font-weight: bold;
    margin-bottom: 15px;
    margin-top: 5px;
  }
  .text{
    color: #666666;
    line-height: 24px;
    margin-bottom: 30px;
  }
  .btns{
    display: flex;
    justify-content: space-around;
    text-align: center;
    font-size: 14px;
    line-height: 33px;
  }
  .btns>div{
    width: 100px;
    border-radius: 4px;
  }
  .btn_cansel{
    background: #E6E6E6;
    color: #B3B3B3;
  }
  .btn_sure{
    background: linear-gradient(to right,#F7AB30,#FA7624);
    color: #FFFFFF;
  }
</style>
