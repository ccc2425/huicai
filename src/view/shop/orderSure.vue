<template>
    <div>
      <headerBack :title="title"></headerBack>
      <div class="box">
        <div v-if="!addressShow" class="addaddress">
          <div class="add_img">
            <img src="../../assets/image/i30.png" alt="">
          </div>
          请添加收货地址
        </div>
        <div v-if="addressShow" class="hasaddress clearfix">
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
      <div class="box apply_type">
        <div class="flex_bettwen">
          <div>支付方式</div>
          <div>积分支付</div>
        </div>
        <div class="flex_bettwen">
          <div>积分余额</div>
          <div><span>2365</span></div>
        </div>
      </div>
      <div class="mb10">
        <item_detail :type="type" :beizhu="beizhu"></item_detail>
      </div>
      <div class="box padb50">
        <div class="list flex_bettwen">
          <div>商品金额</div>
          <div class="fs18">99.00HC</div>
        </div>
        <div class="list flex_bettwen">
          <div>运费</div>
          <div>10.00HC</div>
        </div>
      </div>
      <div class="foot flex_bettwen">
        <div class="foot_l">支付积分：<span class="big">109</span><span>.00HC</span></div>
        <div class="btns" @click="buy">提交订单</div>
      </div>
      <alert4 v-if="alertShow" @getAlert="fromAlert"></alert4>
    </div>
</template>

<script>
    import headerBack from "../../components/headerBack"
    import item_detail from "../../components/item_detail"
    import alert4 from "../../components/alert/alert4"
    export default {
      name: "orderSure",
      components:{
        headerBack,
        item_detail,
        alert4
      },
      data(){
        return{
          title:'确认订单',
          addressShow:true,
          type:true,
          // state:
          alertShow:false,
          beizhu:'',
        }
      },
      methods:{
        fromAlert(data){
          this.alertShow = false
          console.log(data)
        },
        buy(){
          this.alertShow = true
        },

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
  }
  .addaddress{
    text-align: center;
    font-size: 12px;
    line-height: 18px;
  }
  .add_img{
    width: 32px;
    height: 32px;
    margin: 10px auto;
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
  .apply_type{
    line-height: 30px;
    font-size: 13px;
  }
  .apply_type span{
    color: #FB4D4D;
    font-size: 16px;
    font-weight: bold;
  }
  .list{
    font-size: 13px;
    line-height: 32px;
  }
  .foot{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 49px;
    background: #FFFFFF;
    padding: 0 10px;
  }
  .foot_l{
    line-height: 49px;
    font-size: 13px;
    padding-left: 15px;
  }
  .foot_l span{
    color: #FB4D4D;
  }
  .foot_l .big{
    font-weight: bold;
    font-size: 23px;
  }
  .btns{
    width: 110px;
    height: 35px;
    line-height: 35px;
    margin: 7px 0;
    background: linear-gradient(to right,#F7B132,#FA7624);
    text-align: center;
    color: #FFFFFF;
    border-radius: 6px;
  }

</style>
