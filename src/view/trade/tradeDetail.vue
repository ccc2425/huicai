<template>
    <div>
      <headerBack :title="title"></headerBack>
      <div class="box">
        <div class="tit">订单信息</div>
        <div class="list_box">
          <div><span>{{info.time_msg}}</span><span>{{info.limit_time}}</span></div>
          <div><span>订单号</span><span>{{info.order_id}}</span></div>
          <div><span>卖出账号</span><span>{{info.sole_id}}</span></div>
          <div><span>交易数量</span><span class="font_color">{{info.score}}</span></div>
          <div><span>实际交易额</span><span class="font_color">￥{{info.balance}}</span></div>
          <div><span>订单状态</span><span>{{info.status_msg}}</span></div>
          <div><span>挂单时间</span><span>{{info.createtime}}</span></div>
          <div><span>下单时间</span><span>{{info.match_time}}</span></div>
        </div>
      </div>
      <div class="box">
        <div class="tit">卖家信息</div>
        <div class="list_box">
          <div><span>卖家微信</span><span>{{info.wx_acct}}</span></div>
          <div><span>卖家电话</span><span>{{info.mobile}}</span></div>
          <div><span>银行名称</span><span>{{info.bank_name}}</span></div>
          <div><span>卖家户名</span><span>{{info.bank_user}}</span></div>
          <div><span>卖家银行卡号</span><span>{{info.bank_no}}</span></div>
        </div>
      </div>
      <div class="boxs">
        <div class="tit">上传凭证</div>
        <div class="add_img">
          <div class="img" v-if="upShow">
            <div class="pr">
              <i class="iconfont icon" @click="deleteImg()" v-if="info.is_rec_btn == 1">&#xe73d;</i>
              <img :src="imgList" alt="">
            </div>
          </div>
          <div v-else="upShow" class="pr ups">
            <input class="upimg" type="file" @change="getImg" accept="image/*" value="" />
            <div class="add_img_in">
              <img src="../../assets/image/i6.png" alt="">
            </div>
            <p class="add">点击上传凭证</p>
          </div>
        </div>
      </div>
      <div class="btn_box">
        <div v-if="info.is_rec_btn == 1" class="btn" @click="surePay">确认付款</div>
        <div v-if="info.is_cop_btn == 1" class="btn1" @click="openComplant">投诉</div>
      </div>
    </div>
</template>

<script>
    import headerBack from "../../components/headerBack"
    import { Toast,Indicator } from 'mint-ui'
    export default {
      name: "tradeDetail",
      components:{
        headerBack,
        Toast,
        Indicator
      },
      data(){
          return{
            title:'订单详情',
            upShow:false,
            imgUrl:'',
            btn:0,
            order_id:'',
            info:'',
            imgList:''
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
              this.imgList = res.data.pay_img
              if (res.data.pay_img != ''){
                this.upShow = true
              }
            }
          })
        },
        getImg(val){
          Indicator.open('上传中...');
          let that = this;
          console.log(val)
          var imgFile = val.target.files[0];
          var reader = new FileReader();
          reader.readAsDataURL(imgFile)
          reader.onload = function (e) {
            that.imgUrl = e.target.result
            that.imgUrl = that.imgUrl.replace(/:;/, ":image/jpeg;")
            that.imgList = e.target.result
            that.$('common/upbase64img', {img:that.imgUrl}, res => {
              console.log(res)
              if (res.code === 200) {
                Indicator.close();
                that.imgList = res.data.url
                that.upShow = true
                Toast({
                  message: res.msg,
                  position: 'middle',
                  duration: 500
                });
                if (that.imgList !=""){
                  that.upShow = true
                } else {
                  that.upShow = false
                }
              }else {
                Indicator.close();
                Toast({
                  message: res.msg,
                  position: 'middle',
                  duration: 1000
                });
              }
            })
          }
        },
        deleteImg(){
          this.imgList = '';
          this.upShow = false
        },
        surePay(){
          if (this.upShow){
            this.$('score/payimg',{order_id:this.order_id,img:this.imgList},res=>{
              console.log(res)
              if (res.code === 200){
                window.location.reload()
              }
            })
          } else {
            Toast({
              message: '请先上传支付凭证',
              position: 'middle',
              duration: 1000
            });
          }

        },
        openComplant(){//投诉
          this.$router.push('/trade/tradeComplaint?order_id='+ this.info.order_id + '&status='+this.info.status)
        }
      },
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
  .ups{
    padding: 15px 0 10px;
  }
  .add_img_in{
    width: 45px;
    height: 45px;
    margin: 0 auto 8px;
  }
  .upimg{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }
  .icon{
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 20px;
    color: #FFFFFF;
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
