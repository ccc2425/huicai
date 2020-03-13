<template>
  <div class="bg">
    <div class="alert">
      <div class="title">竞价操作</div>
      <div>
        <div class="flex_bettwen ipt_box">
          <div class="co666">请选择您的出价</div>
          <div class="font_color">
            <i @click="less" class="iconfont icon_less coccc">&#xe620;</i>
            <input type="number" v-model="ipt">
            <i @click="add" class="iconfont icon_add">&#xe621;</i>
          </div>
        </div>
        <div class="integral">当前积分余额：2000</div>
      </div>
      <div class="text">
        竞价规则：所有发布上线的广告可重新进入竞价操作，广告位排名可以自由竞价，按照积分由高至低排名，同等积分按照广告投放的时间顺序排名。
      </div>
      <div class="btns">
        <div class="btn_cansel" @click="cansel">取消</div>
        <div class="btn_sure" @click="sure">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "alert2",
    data(){
      return{
        ipt:10
      }
    },
    methods:{
      less(){
        this.ipt --
        if(this.ipt<=0){
          this.ipt = 0
          return false
        }
      },
      add(){
        this.ipt ++
      },
      cansel(){
        this.$emit('getAlert2',false)
      },
      sure(){
        this.$emit('getAlert2',false)
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
    padding-top: 20px;
    color: #666666;
    line-height: 20px;
    margin-bottom: 20px;
    font-size: 12px;
    border-top: 1px solid #E6E6E6;
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
  .ipt_box{
    padding-right: 5px;
    margin-bottom: 20px;
  }
  .ipt_box input{
    width: 30px;
    margin: 0px 10px;
    text-align: center;
    color: #F97B26;
  }
  .integral{
    font-size: 13px;
    margin-bottom: 20px;
    color: #F97C26;
  }
</style>
