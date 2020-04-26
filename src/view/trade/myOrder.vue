<template>
    <div>
      <headerBack :title="title"></headerBack>
      <div class="classfy flex_bettwen">
        <div :class="{actives:index == 0}" @click="chose(0,'wait')">待处理</div>
        <div :class="{actives:index == 1}" @click="chose(1,'sall')">进行中</div>
        <div :class="{actives:index == 2}" @click="chose(2,'success')">已完成</div>
        <div :class="{actives:index == 3}" @click="chose(3,'fail')">已取消</div>
      </div>
      <div class="table">
        <div class="flex_bettwen table_head">
          <div class="td1">订单号</div>
          <div class="td2">交易类型</div>
          <div class="td3">交易数量</div>
          <div class="td4">交易金额</div>
          <div class="td5">操作</div>
        </div>
        <mt-loadmore :autoFill="false" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
          <div class="table_body">
            <div v-for="item in list" class="list flex_bettwen">
              <div class="td1 texthidden pdl10">{{item.order_id}}</div>
              <div class="td2">{{item.pay_type}}</div>
              <div class="td3 font_color">{{item.score}}</div>
              <div class="td4 font_color">￥{{item.balance}}</div>
              <div class="td5"><span class="detail" @click="openDetail(item.order_id,item.user_type)">详细</span></div>
            </div>
          </div>
        </mt-loadmore>
      </div>
    </div>
</template>

<script>
    import headerBack from "../../components/headerBack"
    import { Indicator } from 'mint-ui'
    export default {
      name: "myOrder",
      components:{
        headerBack,
        Indicator
      },
      data(){
        return{
          title:'我的订单',
          index:0,
          list:[],
          type:'wait',
          page:1,
          pagesize:10,
          state:true,
          allLoaded:false,
        }
      },
      mounted(){
        this.getmain()
      },
      methods:{
        getmain(){
          Indicator.open('加载中...');
          this.$('score/orderlist',{type:this.type,page:this.page,pagesize: this.pagesize},res=>{
            console.log(res)
            if (res.code === 200){
              Indicator.close();
              if (res.data.length<this.pagesize){
                this.state = false
                this.allLoaded = true
              }
              if (this.page == 1){
                this.list = res.data
              } else {
                this.list.push.apply(this.list,res.data)
                this.$refs.loadmore.onBottomLoaded();
              }
            }
          })
        },
        chose(i,type){
          this.index = i
          this.type = type
          this.page = 1
          this.getmain()
        },
        loadBottom() {
          if (this.state) {
            this.page++
            this.getmain()
          }
        },
        openDetail(order_id,user_type){
          if (this.type == 'sall'){
            if (user_type == 'seller'){
              this.$router.push('/trade/buyer?order_id='+order_id)
            }else {
              this.$router.push('/trade/tradeDetail?order_id='+order_id)
            }
          } else {
            this.$router.push('/trade/myOrderDetail?order_id='+order_id)
          }
        }
      }

    }
</script>

<style scoped>
  .classfy{
    padding: 0 25px;
    line-height: 45px;
    text-align: center;
    color: #999999;
    background: #FFFFFF;
  }
  .actives{
    position: relative;
  }
  .actives:after{
    bottom: 5px;
  }
  .table{
    width: 355px;
    margin: 10px auto;
    border-radius: 6px;
    background: #FFFFFF;
    text-align: center;
    font-size: 12px;
  }
  .table_head{
    height: 35px;
    line-height: 35px;
    background: #FFF7E5;
  }
  .td1{
    width: 85px;
  }
  .td2{
    width: 73px;
  }
  .td3{
    width: 65px;
  }
  .td4{
    width: 72px;
  }
  .td5{
    width: 60px;
  }
  .list{
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #F5F5F5;
  }
  .list:last-child{
    border-bottom: 0;
  }
  .detail{
    width: 40px;
    height: 18px;
    line-height: 18px;
    color: #FFFFFF;
    background: linear-gradient(to right,#F7AB31,#FA7624);
    border-radius: 4px;
  }
  .pdl10{
    padding-left: 10px;
  }
</style>
