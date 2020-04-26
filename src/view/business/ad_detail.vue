<template>
    <div>
      <div class="header">
        <i @click="back" class="iconfont icon_l">&#xe601;</i>
        <p>广告</p>
        <span v-if="is_self" class="icon_r" @click="showAlert(2)">竞价</span>
      </div>
      <div class="zhanwei"></div>
      <div v-if="tipShow" class="tip">
        可退出广告倒计时：{{time}}s <i class="iconfont tis" @click="closeAd">&#xe632;</i>
      </div>
      <div v-if="is_self" class="content">
        <div class="title">{{list.title}}</div>
        <div class="time">发布时间：{{list.createtime}}</div>
        <div class="img_box">
          <img :src="list.master_img" alt="">
        </div>
        <div class="text">
          <p>{{list.content}}</p>
        </div>
      </div>
      <div v-if="!is_self" class="content1 ">
        <div class="title">{{list.title}}</div>
        <div class="time">发布时间：{{list.createtime}}</div>
        <div class="img_box">
          <img :src="list.master_img" alt="">
        </div>
        <div class="text">
          <p v-html="texts"></p>
        </div>
      </div>
      <div v-if="is_self" class="foot">
        <div v-if="btnShow" class="btn" @click="showAlert(1)">重新编辑 <i class="iconfont">&#xe676;</i></div>
        <div class="inform pr">
          <div>当前收益：{{list.ad_inc}}</div>
        </div>
      </div>
      <tishi :tishi="tishi" :tishiShow="tishiShow"></tishi>
      <alert1 v-if="alert1Show" :text="alert1Text" @getAlert1="getAlert1btn" :ad_id="ad_id"></alert1>
      <alert2 v-if="alert2Show" @getAlert2="getAlert2btn" :ad_id="ad_id"></alert2>
    </div>
</template>

<script>
    import tishi from "../../components/tishi"
    import alert1 from "../../components/alert/alert1"
    import alert2 from "../../components/alert/alert2"
    export default {
      name: "ad_detail",
      components:{
        tishi,
        alert1,
        alert2
      },
      data(){
        return{
          time:0,
          btnTime:900,
          btnShow:true,
          tipShow:true,
          tishiShow:false,
          tishi:'',
          alert1Text:'重新编辑广告后会重新扣除对应积分，请确定是否重新编辑广告？',
          alert1Show:false,
          alert2Show:false,
          ad_id:this.$route.query.id,
          type:this.$route.query.type,
          list:[],
          is_self:false,
          closeTime:null,//倒计时广告
          closeBtn:null,//按钮倒计时
          texts:'',
        }
      },
      mounted(){
        this.getmain()
      },
      methods:{
        getmain(){
          this.$('advert/info',{ad_id:this.ad_id,type:this.type},res=>{
            // console.log(res)
            if (res.code === 200){
              this.list = res.data
              this.time = res.data.see_time
              this.texts = res.data.content
              this.timeout()
              this.texts=this.texts.replace(/\n/g,"<br/>")
              // console.log(this.texts)
              if (res.data.is_self == 1) {
                this.is_self = true
              }else {
                this.is_self = false
              }
            }
          })
        },
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
          console.log(data)
          if (data){
            localStorage.setItem('ad_detail', JSON.stringify(this.list))
            this.$router.push('createad?ad_id='+this.ad_id)
          }
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
        },
        timeout(){
          this.closeTime = setInterval(()=>{
            this.time --
            if (this.time <=0){
              this.$('advert/log',{ad_id:this.ad_id},res=>{
                // console.log(res)
              })
              clearInterval(this.closeTime)
            }
          },1000)
          this.closeBtn = setInterval(()=>{
            this.btnTime --
            if (this.btnTime <=0){
              this.btnShow = false
              clearInterval(this.closeBtn)
            }
          },1000)
        }
      },
      destroyed(){
        if (this.closeTime){
          clearInterval(this.closeTime)
        }
        if (this.closeBtn){
          clearInterval(this.closeBtn)
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
    background: #FFFFFF;
  }
  .content1{
    padding: 18px 37px;
    background: #FFFFFF;
    min-height: calc(100vh - 65px);
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
    /*display: flex;*/
    /*justify-content: space-between;*/
    background: rgba(0,0,0,0.6);
    padding: 0 7px;
    line-height: 44px;
    height: 44px;
  }
  /*.inform>div{*/
  /*  width: 50%;*/
  /*}*/
  /*.b-r{*/
  /*  position: absolute;*/
  /*  left: 50%;*/
  /*  top: 50%;*/
  /*  transform: translate(-50%,-50%);*/
  /*  width: 1px!important;*/
  /*  height: 14px;*/
  /*  background: #FFFFFF;*/
  /*}*/
  .btn{
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    background: linear-gradient(to right,#F7B132,#FA7624);
    margin-bottom: 15px;
  }
</style>
