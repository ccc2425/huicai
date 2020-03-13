<template>
    <div>
      <div class="top_box">
        <div class="top">
          <headerBack :title="title"></headerBack>
          <div class="tip">
            <i class="iconfont">&#xe608;</i> 我的推荐人：王小放(青睐的咸鱼)
          </div>
          <div class="flex_bettwen inform pr">
            <div>
              <p>3562</p>
              <p>积分余额</p>
            </div>
            <div>
              <p>4658</p>
              <p>累计收益</p>
            </div>
            <div class="border_right"></div>
          </div>
        </div>
        <div class="classfys flex_around">
          <div class="pr" :class="{actives:index==0}" @click="chose(0)">团队成员</div>
          <div class="pr" :class="{actives:index==1}" @click="chose(1)">直推成员</div>
        </div>
      </div>
      <div class="box">
        <div v-for="item in list" class="list">
          <div class="head_icon">
            <img :src="item.img" alt="">
          </div>
          <div>
            <div class="name">{{item.name}}</div>
            <div class="form_box">
              <div class="time">注册时间：{{item.time}}</div>
              <div v-if="index===0" class="getname">推荐人：{{item.getname}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import headerBack from "../../components/headerBack"
    export default {
      name: "myteam",
      components:{
        headerBack
      },
      data(){
        return{
          title:'我的团队',
          index:0,
          list:[
            {img:require('../../assets/image/ban.png'),name:'超级马里奥',time:'2020-02-28',getname:'航行中的爪鱼'},
            {img:require('../../assets/image/ban.png'),name:'超级马里奥',time:'2020-02-28',getname:'航行中的爪鱼'},
            {img:require('../../assets/image/ban.png'),name:'超级马里奥',time:'2020-02-28',getname:'航行中的爪鱼'},
            {img:require('../../assets/image/ban.png'),name:'超级马里奥',time:'2020-02-28',getname:'航行中的爪鱼'},
            {img:require('../../assets/image/ban.png'),name:'超级马里奥',time:'2020-02-28',getname:'航行中的爪鱼'},


          ]
        }
      },
      methods:{
        chose(index){
          this.index = index
          // if (index == 0 ) {
          //   this.list = this.list1
          // }else {
          //   this.list = this.list2
          // }
        }
      }
    }
</script>

<style scoped>
  .top_box{
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
  }
  .top{
    background: #FFFFFF;
  }
  .inform{
    padding: 30px 0;
    border-bottom: 1px solid #E6E6E6;
  }
  .inform>div{
    width: 50%;
    text-align: center;
  }
  .inform>div>p:first-child{
    font-size: 24px;
    line-height: 32px;
    font-weight: bold;
  }
  .inform>div>p:last-child{
    font-size: 12px;
    line-height: 16px;
  }
  .border_right{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 1px!important;
    height: 27px;
    background: #E6E6E6;
  }
  .tip{
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    background: #FFF7E5;
    color: #FA7624;
  }
  .box{
    margin-top: 10px;
    background: #FFFFFF;
  }
  .list{
    display: flex;
    justify-content: flex-start;
    padding: 17px 0 23px 18px;
    border-bottom: 1px solid #E6E6E6;
  }
  .head_icon{
    width: 35px;
    height: 35px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;
  }
  .name{
    font-size: 14px;
    line-height: 18px;
    margin-bottom: 6px;
  }
  .form_box{
    display: flex;
    justify-content: flex-start;
    line-height: 13px;
    font-size: 11px;
  }
  .time{
    width: 150px;
    color: #666666;
  }
</style>
