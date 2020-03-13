<template>
    <div>
      <headerBack :title="title"></headerBack>
      <div class="box">
        <div class="hasaddress clearfix">
          <div class="fl user_img">
            <img src="../../assets/image/i12.png" alt="">
          </div>
          <div class="fl info">
            <div>李小晨 13540861223</div>
            <div class="address co999">四川省成都市高新区天府五街200号菁蓉汇1B502
            </div>
          </div>
        </div>
      </div>
      <div class="box flex_bettwen">
          <div>支付方式</div>
          <div>积分支付</div>
      </div>
      <div class="mb10">
        <item_detail :type="type" :beizhu="beizhu"></item_detail>
      </div>
      <div class="box padb50">
        <div class="list flex_bettwen">
          <div>商品金额</div>
          <div>99.00HC</div>
        </div>
        <div class="list flex_bettwen">
          <div>运费</div>
          <div>10.00HC</div>
        </div>
        <div class="list flex_bettwen">
          <div>运费</div>
          <div class="interval"><span>10</span>.00HC</div>
        </div>
      </div>
      <div class="box mab60">
          <div class="orderform pr">
            <span class="order_name">订单编号</span>
            <span class="order_time">23658954622</span>
            <span class="copy">复制</span>
          </div>
          <div class="orderform">
            <span class="order_name">下单时间</span>
            <span class="order_time">2020-03-04  11:25</span>
          </div>
      </div>
      <div class="btn_box">
        <div class="btn"><img src="../../assets/image/i13.png" alt="">订单客服</div>
      </div>
    </div>
</template>

<script>
    import headerBack from "../../components/headerBack"
    import item_detail from "../../components/item_detail"
    export default {
      name: "orderDetail",
      components:{
        headerBack,
        item_detail
      },
      data(){
          return{
            title:'订单详情',
            type:false,
            beizhu:'线头都处理好',
          }
      }
    }
</script>

<style scoped>
  .box{
    width: 355px;
    padding: 10px;
    margin: 10px auto;
    background: #FFFFFF;
    border-radius: 6px;
    font-size: 13px;
  }
  .hasaddress{
    padding: 8px 2px;
  }
  .user_img{
    width: 40px;
    height: 40px;
    margin-right: 12px;
  }
  .info{
    width: 240px;
    font-size: 16px;
    line-height: 20px;
  }
  .address{
    font-size: 13px;
  }
  .list{
    line-height: 32px;
  }
  .interval{
    color: #FB4D4D;
  }
  .interval span{
    font-size: 23px;
  }
  .orderform{
    line-height: 30px;
  }
  .order_name{
    display: inline-block;
    width: 75px;
  }
  .copy{
    position: absolute;
    top: 5px;
    right: 10px;
    padding: 0 4px;
    line-height: 16px;
    font-size: 11px;
    color: #FA7624;
    border: 1px solid #FA7624;
    border-radius: 2px;
  }
  .mab60{
    margin-bottom: 70px;
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
  .btn img{
    width: 15px;
    height: 15px;
    vertical-align: text-bottom;
    margin-right: 5px;
  }
</style>
