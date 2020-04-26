<template>
  <div>
    <headerBack :title="title"></headerBack>
    <div class="box">
      <div class="tit">订单信息</div>
      <div class="list_box">
        <div><span>{{info.time_msg}}</span><span>{{info.limit_time}}</span></div>
        <div><span>订单号</span><span>{{info.order_id}}</span></div>
        <div><span>交易数量</span><span class="font_color">{{info.score}}</span></div>
        <div><span>实际交易额</span><span class="font_color">￥{{info.balance}}</span></div>
        <div><span>订单状态</span><span>{{info.status_msg}}</span></div>
        <div><span>挂单时间</span><span>{{info.createtime}}</span></div>
        <div><span>下单时间</span><span>{{info.match_time}}</span></div>
      </div>
    </div>
    <div class="box">
      <div class="tit">买家信息</div>
      <div class="list_box">
        <div><span>买家账号</span><span>{{info.sole_id}}</span></div>
        <div><span>买家电话</span><span>{{info.mobile}}</span></div>
      </div>
    </div>
    <div class="boxs" v-if="upShow">
      <div class="tit">上传凭证</div>
      <div class="add_img">
        <div class="img">
          <div class="pr">
            <img :src="info.pay_img" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="btn_box">
      <div v-if="info.is_rec_btn == 1" class="btn" @click="sure">确定</div>
      <div v-if="info.is_cop_btn == 1" class="btn1" @click="openComplant">投诉</div>
    </div>
  </div>
</template>

<script>
    import headerBack from "../../components/headerBack"
    export default {
      name: "buyer",
      components:{
        headerBack
      },
      data(){
        return{
          title:'订单详情',
          upShow:false,
          btn:2,
          info:'',
          order_id:'',
        }
      },
      mounted(){
        this.order_id = this.$route.query.order_id
        this.getmain()
      },
      methods:{
        getmain(){
          this.$('score/order',{order_id:this.order_id},res=>{
            console.log(res)
            if (res.code === 200){
              this.info = res.data
              if (res.data.pay_img != ''){
                this.upShow = true
              }
            }
          })
        },
        openComplant(){//投诉
          this.$router.push('/trade/tradeComplaint?order_id='+ this.info.order_id + '&status='+this.info.status)
        },
        sure(){
          this.$('score/confirm',{order_id:this.order_id},res=>{
            console.log(res)
            if (res.code === 200){
              this.$router.back()
            }
          })
        }
      }
    }
</script>

<style scoped>
  .box,.boxs{
    width: 355px;
    margin: 12px auto;
    line-height: 32px;
  }
  .box{
    padding: 15px;
    background: #FFFFFF;
    border-radius: 10px;
  }
  .boxs .tit{
    padding: 0 8px;
    margin-bottom: 12px;
  }
  .tit{
    font-weight: bold;
  }
  .list_box>div{
    display: flex;
    justify-content: space-between;
    color: #666;
  }
  .list_box>div>span:nth-child(2n){
    color: #999999;
  }
  .add_img{
    width: 355px;
    /*height: 140px;*/
    padding: 15px 0;
    text-align: center;
    color: #999999;
    background: #FFFFFF;
    border-radius: 10px;
  }

  .img>div{
    width: 103px;
    height: 103px;
    margin: 0 15px;
  }
  .btn_box{
    margin: 16px auto;
  }
  .btn1{
    width: 330px;
    height: 40px;
    margin: auto;
    line-height: 40px;
    text-align: center;
    color: #FC5D00;
    border: 1px solid #FC5D00;
    border-radius: 6px;
  }
</style>
