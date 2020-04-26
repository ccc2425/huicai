<template>
    <div>
      <div class="inform">
        <div class="title">我的</div>
        <div class="inform_box clearfix">
          <div class="header_img fl">
            <img :src="info.avatar" alt="">
          </div>
          <div class="fl right">
            <div class="name">
              <p>{{info.username}}</p> <span v-if="info.user_type == 'agent1'"><i class="iconfont">&#xe606;</i> 一级代理</span>
              <span v-if="info.user_type == 'agent2'"><i class="iconfont">&#xe606;</i> 二级代理</span>
              <span v-if="info.user_type == 'agent3'"><i class="iconfont">&#xe606;</i> 三级代理</span>
              <img v-if="info.user_type == 'normal'" class="vip" src="../assets/image/i14.png" alt="">
              <img v-if="info.user_type == 'advert'" class="vip" src="../assets/image/i15.png" alt="">
            </div>
<!--            <p class="name">微信昵称 </p>-->
<!--            <p class="name">微信昵称 </p>-->
            <p class="user_id">ID：{{info.sole_id}}</p>
            <p class="contribution" @click="openwindow('contribution')">贡献值：{{info.ded_score}} <i class="iconfont">&#xe62e;</i></p>
          </div>
        </div>
      </div>
      <div class="out pr">
        <div class="box">
          <div class="news" @click="openwindow('integral')">
            <div>
              <p class="num font_color">{{info.score}}</p>
              <p>积分余额</p>
            </div>
            <p class="people_num">直推人数：<span class="font_color">{{info.a_sub_num}}人</span></p>
          </div>
          <div class="news" @click="openwindow('myteam')">
            <div>
              <p class="num font_color">{{info.all_score}}</p>
              <p>累计收益</p>
            </div>
            <p class="people_num">团队人数：<span class="font_color">{{info.all_sub_num}}人</span></p>
          </div>
        </div>
        <div class="box">
          <div class="classfy" @click="openwindow('share')">
            <div><img src="../assets/image/l1.png" alt=""></div>
            <p>我要分享</p>
          </div>
          <div class="classfy" @click="openwindow('transfer')">
            <div><img src="../assets/image/l2.png" alt=""></div>
            <p>我要转让</p>
          </div>
          <div class="classfy" @click="openAD()">
            <div><img src="../assets/image/l3.png" alt=""></div>
            <p>在投广告</p>
          </div>
          <div class="classfy" @click="openCar">
            <div><img src="../assets/image/l4.png" alt=""></div>
            <p>我的订单</p>
          </div>
        </div>
        <div class="list_box">
          <div class="list pr" @click="openwindow('bindcard')">
            <div><i class="iconfont">&#xe8bf;</i>银行卡绑定</div>
            <i class="iconfont icon">&#xe623;</i>
          </div>
          <div class="list pr" @click="openwindow('realname')">
            <div><i class="iconfont">&#xe652;</i>实名认证</div>
            <i class="iconfont icon">&#xe623;</i>
          </div>
          <div class="list pr" @click="openwindow('address')">
            <div><i class="iconfont">&#xe60d;</i>收货地址</div>
            <i class="iconfont icon">&#xe623;</i>
          </div>
          <div class="list pr" @click="openwindow('set_password')">
            <div><i class="iconfont">&#xe65e;</i>修改密码</div>
            <i class="iconfont icon">&#xe623;</i>
          </div>
          <div class="list pr" @click="openwindow('complaint')">
            <div><i class="iconfont">&#xe631;</i>投诉建议</div>
            <i class="iconfont icon">&#xe623;</i>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "mine",
      data(){
          return{
            info:[]
          }
      },
      mounted(){
        // let info = JSON.parse(localStorage.getItem('info'))
        // if (info){
        //   this.info = info
        // }else {
          this.getinfo()
        // }
      },
      methods:{
        openwindow(url){
          if (url == 'integral'){
            this.$router.push('mine/'+url+'?score='+this.info.score+'&all_score='+this.info.all_score)
          } else if (url == 'myteam') {
            this.$router.push('mine/'+url+'?a_sub_num='+this.info.a_sub_num+'&all_sub_num='+this.info.all_sub_num)
          }else {
            this.$router.push('mine/'+url)
          }
        },
        getinfo(){
          this.$('user/info', {}, res => {
            console.log(res)
            if (res.code === 200) {
              this.info = res.data
              localStorage.setItem('rusername',res.data.rusername)
              localStorage.setItem('is_paypwd',res.data.is_paypwd)
              localStorage.setItem('score',res.data.score)
              localStorage.setItem('info', JSON.stringify(res.data))
            }
          })
        },
        openAD(){
          this.$router.push('business/myad')
        },
        openCar(){
          this.$router.push('/shop/shopCar?car=0')
        }
      }
    }
</script>

<style scoped>
  .inform{
    width: 100%;
    height: 180px;
    background: linear-gradient(to right,#EDAE38,#ED6E28);
    color: #ffffff;
    font-size: 12px;
  }
  .title{
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    line-height: 45px;
  }
  .inform_box{
    padding: 12px 22px;
  }
  .header_img{
    width: 60px;
    height: 60px;
    margin-right: 8px;
    border-radius: 50%;
    overflow: hidden;
  }
  .inform_box p{
    line-height: 18px;
  }
  .inform_box .name{
    font-size: 16px;
    font-weight: bold;
    line-height: 24px;
  }
  .name{

  }
  .name p{
    display: inline-block;
    max-width: 190px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .name span{
    background: #040000;
    color: #CE9D44;
    font-size: 10px;
    line-height: 20px;
    border-radius: 20px;
    padding: 0 5px;
    vertical-align: top;
    margin-top: 2px;
    margin-left: 10px;
  }
  .name span i{
    font-size: 10px;
  }
  .contribution i{
    font-size: 15px;
  }
  .out{
    top: -60px;
    padding: 10px;
  }
  .box{
    display: flex;
    justify-content: space-between;
    width: 100%;
    background: #ffffff;
    border-radius: 10px;
    margin-bottom: 10px;
  }
  .news{
    width: 50%;
    padding: 15px;
    text-align: center;
    font-size: 11px;
    color: #999999;
  }
  .news>div{
    margin-bottom: 15px;
  }
  .num{
    height: 25px;
    font-size: 20px;
    font-weight: bold;
    line-height: 25px;
  }
  .classfy{
    width: 25%;
    padding: 6px 0 12px;
    text-align: center;
  }
  .classfy>div{
    width: 35px;
    height: 35px;
    margin: 8px auto;
    border-radius: 50%;
    overflow: hidden;
  }
  .list_box{
    padding: 0 15px;
    background: #ffffff;
    border-radius: 10px;
    color: #808080;
    margin-bottom: 10px;
  }
  .list{
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    border-bottom: 1px solid #F5F5F5;
  }
  .list>div>i{
    margin-right: 10px;
  }
  .icon{
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    font-size: 12px;
  }
  .btn{
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-radius: 10px;
    text-align: center;
    font-size: 15px;
    color: #666666;
    background: #ffffff;
  }
  .vip{
    width: 61px;
    vertical-align: text-bottom;
  }
  .right{
    width: 260px;
  }
</style>
