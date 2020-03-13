<template>
    <div>
      <div class="top">
        <div class="header">
          <i @click="back" class="iconfont icon_l">&#xe601;</i>
          <p>我的广告</p>
          <i @click="createad" class="iconfont icon_r">&#xe676;</i>
        </div>
        <tip></tip>
        <div class="classfy">
          <div :class="{active:index===0}" class="pr" @click="chosethis(0)">投放中</div>
          <div :class="{active:index===1}" class="pr" @click="chosethis(1)">已过期</div>
        </div>
      </div>
      <div class="zhanwei"></div>
      <div>
        <adlist :list="list" :state="state"></adlist>
      </div>
    </div>
</template>

<script>
    import adlist from "../../components/adlist"
    import tip from "../../components/tip"
    export default {
      name: "myad",
      components:{
        adlist,
        tip
      },
      data(){
        return{
          index:0,
          state:true,
          list:[
            {img:require('../../assets/image/ban.png'),tit:'雨师餐饮疫期不打烊',text:'雨师餐饮疫期不打烊，店内订单全部采用全封闭式包装保证食用卫生安全，全场8折！',date:'02月27日-03月26日',num:'3952'},
            {img:require('../../assets/image/ban.png'),tit:'中考冲刺数理化课程开售',text:'开设初中生语,数,英,理化全科目课程,线上老师实时教学,针对性辅导,线下班主任+学科+心理素质+自习+规划师...开设初中生语,数,英,理化全科目课程,线上老师实时教学,针对性辅导,线下班主任+学科+心理素质+自习+规划师...',date:'02月27日-03月26日',num:"3952"},
            {img:require('../../assets/image/ban.png'),tit:'春款新品特别推出',text:'春款新品休闲运动连帽卫衣，百搭单品，柔软亲肤，穿上它就是街上最靓的仔。上新价仅需99元！',date:'02月27日-03月26日',num:"3952"},
            {img:require('../../assets/image/ban.png'),tit:'雨师餐饮疫期不打烊雨师餐饮疫期不打烊',text:'雨师餐饮疫期不打烊，店内订单全部采用全封闭式包装保证食用卫生安全',date:'02月27日-03月26日',num:"3952"},
            {img:require('../../assets/image/ban.png'),tit:'雨师餐饮疫期不打烊雨师餐饮疫期不打烊',text:'雨师餐饮疫期不打烊',date:'02月27日-03月26日',num:"3952"},
          ],
        }
      },
      methods:{
        back(){
          this.$router.go(-1)
        },
        chosethis(index){
          this.index = index
          window.scrollTo(0, 0)
          if (index === 0){
            this.state = true
          } else {
            this.state = false
          }
        },
        createad(){
          this.$router.push('/business/createad')
        }
      }
    }
</script>

<style scoped>
  .top{
    z-index: 999;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
  .header{
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 15px;
    color: #333333;
    font-weight: bold;
    background: #ffffff;
  }
  .header .iconfont{
    position: absolute;
    top: 0;
    font-size: 20px;
    font-weight: normal;
  }
  .icon_l{
    left: 10px;
  }
  .icon_r{
    right: 16px;
  }
  .zhanwei{
    height: 115px;
  }

  .classfy{
    display: flex;
    justify-content: space-around;
    height: 50px;
    line-height: 50px;
    color: #999999;
    font-size: 15px;
    text-align: center;
    background: #ffffff;
  }
  .active{
    color: #FB7939;
    font-weight: bold;
  }
  .active:after{
    position: absolute;
    bottom: 3px;
    left: 50%;
    transform: translateX(-50%);
    content: '';
    width: 20px;
    height: 3px;
    background: #EF651B;
    border-radius: 3px;
  }
</style>
