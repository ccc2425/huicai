<template>
    <div>
      <div class="header">
        <i @click="back" class="iconfont icon_l">&#xe601;</i>
        <p>广告</p>
        <span class="icon_r" @click="showAlert(2)">竞价</span>
      </div>
      <div class="zhanwei"></div>
      <div v-if="tipShow" class="tip">
        可退出广告倒计时：{{time}}s <i class="iconfont tis" @click="closeAd">&#xe632;</i>
      </div>
      <div class="content">
        <div class="title">中考冲刺数理化课程开售</div>
        <div class="time">发布时间：2020-02-27 16:26</div>
        <div class="img_box">
          <img src="../../assets/image/ban.png" alt="">
          <img src="../../assets/image/ban.png" alt="">
          <img src="../../assets/image/ban.png" alt="">
        </div>
        <div class="text">
          <p>开设初中生语,数,英,理化全科目课程,线上老师实时教学,针对性辅导,线下班主任+学科心理素质+自习+规划师。开设初中生语,数,英,理化全科目课程。</p>
          <p>开设初中生语,数,英,理化全科目课程,线上老师实时教学,针对性辅导,线下班主任+学科心理素质+自习+规划师。</p>
        </div>
      </div>
      <div class="foot">
        <div v-if="btnShow" class="btn" @click="showAlert(1)">重新编辑 <i class="iconfont">&#xe676;</i></div>
        <div class="inform pr">
          <div>已浏览：2346</div>
          <div>当前收益：2346</div>
          <div class="b-r"></div>
        </div>
      </div>
      <tishi :tishi="tishi" :tishiShow="tishiShow"></tishi>
      <alert1 v-if="alert1Show" :text="alert1Text" @getAlert1="getAlert1btn"></alert1>
      <alert2 v-if="alert2Show" @getAlert2="getAlert2btn"></alert2>
    </div>
</template>

<script>
    import tishi from "../../components/tishi"
    import alert1 from "../../components/alert1"
    import alert2 from "../../components/alert2"
    export default {
      name: "ad_detail",
      components:{
        tishi,
        alert1,
        alert2
      },
      data(){
        return{
          time:3,
          btnTime:10,
          btnShow:true,
          tipShow:true,
          tishiShow:false,
          tishi:'',
          alert1Text:'重新编辑广告后会重新扣除对应积分，请确定是否重新编辑广告？',
          alert1Show:false,
          alert2Show:false,
        }
      },
      mounted(){
        var closeTime = setInterval(()=>{
          this.time --
          if (this.time <=0){
            clearInterval(closeTime)
          }
        },1000)
        var closeBtn = setInterval(()=>{
          this.btnTime --
          if (this.btnTime <=0){
            this.btnShow = false
            clearInterval(closeBtn)
          }
        },1000)
      },
      methods:{
        back(){
          this.$router.go(-1)
        },
        closeAd(){
          if (this.time === 0){
            this.tipShow = false
          } else {
            this.tishiShow = true
            this.tishi = this.time + '秒后关闭广告'
            setTimeout(()=>{
              this.tishiShow = false
            },1000)
          }
        },
        showAlert(index){
          if (index === 1){
            this.alert1Show = true
          } else {
            if (!this.alert1Show) {
              this.alert2Show = true
            }
          }
          this.stopScroll()
        },
        getAlert1btn(data){
          this.alert1Show = false
          this.allowScroll()
        },
        getAlert2btn(data){
          this.alert2Show = false
          this.allowScroll()
        },
        bodyScroll(event){
          event.preventDefault();
        },
        allowScroll(){
          document.body.style.overflow = ''// 出现滚动条
          document.removeEventListener('touchmove', this.bodyScroll, false)
        },
        stopScroll(){
          document.body.style.overflow = 'hidden'
          document.addEventListener('touchmove', this.bodyScroll, false)
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
  .tip{
    position: sticky;
    top: 45px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 12px;
    background: #FFF7E5;
    color: #FB7939;
  }
  .tis{
    font-size: 14px;
    position: absolute;
    right: 20px;
    color: #999999;
  }
  .content{
    padding: 18px 37px 110px;
  }
  .title{
    font-size: 20px;
    font-weight: bold;
    text-align: center;
  }
  .time{
    font-size: 12px;
    color: #999999;
    line-height: 45px;
    text-align: center;
  }
  .img_box{
    width: 100%;
  }
  .text{
    color: #4D4D4D;
    line-height: 24px;
  }
  .text p{
    margin-top: 10px;
    text-indent: 30px;
  }
  .foot{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    text-align: center;
    color: #ffffff;
  }
  .inform{
    display: flex;
    justify-content: space-between;
    background: rgba(0,0,0,0.6);
    padding: 0 7px;
    line-height: 44px;
    height: 44px;
  }
  .inform>div{
    width: 50%;
  }
  .b-r{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 1px!important;
    height: 14px;
    background: #FFFFFF;
  }
  .btn{
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    background: linear-gradient(to right,#F7B132,#FA7624);
    margin-bottom: 15px;
  }
</style>
