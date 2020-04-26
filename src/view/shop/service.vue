<template>
  <div>
    <headerBack :title="title"></headerBack>
    <div class="box" ref="box">
      <div class="list">
        <div class="list_tit flex_bettwen">
          <div>订单编号 {{orderList.order_id}}</div>
          <div class="co999">{{orderList.createtime}}</div>
        </div>
        <div>
          <div class="clearfix mb15">
            <div class="fl img_box">
              <img :src="orderList.master_image" alt="">
            </div>
            <div class="fl item">
              <div class="tit texthiddens">{{orderList.title}}</div>
              <div class="all">
                <span class="mr5">共{{orderList.num}}件</span> 合计：<span class="fs15">{{orderList.price*orderList.num}}</span>HC
              </div>

            </div>
          </div>
        </div>
        <div class="sizes flex_bettwen" @click="more">
          <span>查看更多</span>
          <span><i class="iconfont">&#xe623;</i></span>
        </div>
      </div>
      <div class="list form">
        <div>
          <span>姓名：</span><input class="iptcob" type="text" placeholder="请输入您的姓名" v-model="name">
        </div>
        <div>
          <span>电话：</span><input class="iptcob" type="text" placeholder="请输入您的电话，客服稍后将会联系您" v-model="tel">
        </div>
      </div>
      <div class="list form text">
        <span>留言：</span><textarea class="iconfont" name="" id="" :placeholder="icon" v-model="context"></textarea>
      </div>
    </div>
    <div class="btn_box">
      <div class="btn" @click="updata">提交</div>
    </div>
  </div>
</template>

<script>
    import headerBack from "../../components/headerBack"
    import { Indicator,Toast } from 'mint-ui';
    export default {
      name: "service",
      components:{
        headerBack,
        Indicator,
        Toast
      },
      data() {
        return {
          title: '联系客服',
          orderList:'',
          name:'',
          tel:'',
          icon:'\ue685 请编辑建议内容',
          context:'',
        }
      },
      mounted() {
        this.orderList = JSON.parse(localStorage.getItem('order_item'))
      },
      methods:{
        more(){
          this.$router.go(-1)
        },
        updata(){
          Indicator.open('提交中...');
          this.$('shop/ordercost',{order_id:this.orderList.order_id,name:this.name,tel:this.tel,content:this.context},res=>{
            console.log(res)
            Indicator.close();
            if (res.code === 200){
              Toast({
                message: '提交成功',
                position: 'middle',
                duration: 1000
              });
              setTimeout(()=>{
                this.$router.go(-1)
              },1000)
            }else {
              Toast({
                message: res.msg,
                position: 'middle',
                duration: 500
              });
            }
          })
        }
      }
    }
</script>

<style scoped>
  .box{
    padding: 10px 10px 70px;
  }

  .btn_box{
    position: fixed;
    left: 0;
    bottom: 0px;
    width: 100%;
    background: #F5F5F5;
  }
  .btn{
    width: 355px;
    margin: 0 auto 10px;
  }
  .list{
    background: #FFFFFF;
    padding: 10px;
    font-size: 12px;
    border-radius: 6px;
    margin-bottom: 10px;
  }
  .list_tit{
    margin-bottom: 12px;
  }
  .img_box{
    width: 100px;
    height: 100px;
    margin-right: 10px;
  }
  .item{
    width: 195px;
    line-height: 20px;
  }
  .list2 .item{
    width: 223px;
  }
  .tit{
    font-size: 15px;
    margin-bottom: 10px;
    line-height: 20px;
    height: 40px;
    margin-top: 5px;
  }
  .fs15{
    font-size: 15px;
  }
  .sizes{
    line-height: 18px;
    font-size: 13px;
    color: #B3B3B3;
    padding-left: 10px;
  }
  .all{
    font-size: 12px;
  }
  .mr5{
    margin-right: 5px;
  }
  .form{
    line-height: 40px;
    font-size: 15px;
    padding-left: 15px;
  }
  .form span{
    display: inline-block;
    width: 50px;
  }
  .form input,.form textarea{
    width: 255px;
  }
  .text span{
    vertical-align: top;
    line-height: 24px;
  }
  .text textarea{
    font-size: 13px;
    height: 90px;
    line-height: 24px;
    resize: none;
  }
</style>
