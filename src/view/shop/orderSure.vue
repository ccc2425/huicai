<template>
    <div>
      <headerBack :title="title"></headerBack>
      <div class="box">
        <div v-if="!addressShow" class="addaddress" @click="addaddress">
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
            <div>{{address.uname}} {{address.mobile}}</div>
            <div class="address co999">{{address.address_des}}
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
          <div><span>{{user_score}}</span></div>
        </div>
      </div>
      <div class="mb10">
        <div>
          <div v-for="items in item" class="boxs">
            <div class="clearfix mb15">
              <div class="fl img_box">
                <img :src="items.master_image" alt="">
              </div>
              <div class="fl item">
                <div class="tit texthiddens">{{items.title}}</div>
                <div class="sizes flex_bettwen">
                  <span>{{items.price}}HC</span>
                </div>
              </div>
            </div>
            <div class="flex_bettwen mb15">
              <div class="lh30">购买数量</div>
              <div v-if="numCheck" class="num_box">
                <span @click="less">-</span><input type="number" readonly="true" v-model="num"><span @click="add">+</span>
              </div>
              <div v-if="!numCheck">x{{items.num}}</div>
            </div>
            <div class="remarks">
              <span>备注</span>
              <input type="text" placeholder="建议留言前先与客服沟通" v-model="items.ipt">
            </div>
          </div>
        </div>
      </div>
      <div class="box mb60">
        <div class="list flex_bettwen">
          <div>商品金额</div>
          <div class="fs18">{{price}}HC</div>
        </div>
        <div class="list flex_bettwen">
          <div>运费</div>
          <div>{{freight_price}}HC</div>
        </div>
      </div>
      <div class="foot flex_bettwen">
        <div class="foot_l">支付积分：<span class="big">{{price}}</span><span>HC</span></div>
        <div class="btns" @click="buy">提交订单</div>
      </div>
      <alert4 v-if="alertShow" @getAlert="fromAlert" @getAlertClose="close" :tip="tip" :tipShow="tipShow"></alert4>
    </div>
</template>

<script>
    import headerBack from "../../components/headerBack"
    import item_detail from "../../components/item_detail"
    import alert4 from "../../components/alert/alert4"
    import { Toast,MessageBox } from 'mint-ui';
    export default {
      name: "orderSure",
      components:{
        headerBack,
        item_detail,
        alert4,
        Toast,
        MessageBox
      },
      data(){
        return{
          title:'确认订单',
          addressShow:true,
          type:true,
          // state:
          alertShow:false,
          beizhu:'',
          numCheck:true,
          ids:'',
          item_id:'',
          address:[],
          item:[],
          user_score:'',
          price:0,
          itemNum:this.$route.query.num,
          freight_price:'',
          addressId:'',
          tip:'',
          tipShow:false,
          num:this.$route.query.num,
          remarks:'',
          password:''
        }
      },
      mounted(){
        if (this.$route.query.cai == 1){
          this.numCheck = false
          this.ids = this.$route.query.ids
          this.getmain()
        }else {
          this.numCheck = true
          this.item_id = this.$route.query.ids
          this.getmain2()
        }
      },
      methods:{
        getmain(){
          this.$('shop/cartorderinfo',{cart_ids:this.ids},res=>{
            console.log(res)
            if (res.code===200){
              this.addressShow = res.data.is_address == 1
              this.address = res.data.address
              this.user_score = res.data.user_score
              this.item = res.data.items
              this.addressId = res.data.address.id
              for (let i = 0; i < res.data.items.length; i++) {
                this.item[i].ipt = ''
                this.price = parseFloat(this.price) + parseFloat(res.data.items[i].num)*parseFloat(res.data.items[i].price) + parseFloat(res.data.items[i].freight_price)
              }
              console.log(this.item)
            }else if (res.code === 204) {
              this.$router.go(-1)
            }
          })
        },
        getmain2(){
          this.$('shop/orderinfo',{item_id:this.item_id},res=>{
            console.log(res)
            if (res.code===200){
              this.addressShow = res.data.is_address == 1
              this.address = res.data.address
              this.user_score = res.data.user_score
              this.item = res.data.item
              this.addressId = res.data.address.id
              this.freight_price = res.data.item[0].freight_price
              this.price = parseFloat(this.itemNum)*parseFloat(this.item[0].price) + parseFloat(res.data.item[0].freight_price)
            }else if (res.code === 204) {
              this.$router.go(-1)
            }
          })
        },
        fromAlert(data){
          this.password = data
          if (this.$route.query.cai == 1) {
            this.$('shop/makeorder', {
              cart_ids: this.ids,
              remark:this.remarks,
              address_id:this.address.id,
              trade_pwd:this.password
            }, res => {
              console.log(res)
              if (res.code === 200) {
                this.alertShow = false
                Toast({
                  message: '交易成功',
                  position: 'middle',
                  duration: 500
                });
                setTimeout(()=>{
                  this.$router.push('/shop/shopCar?car=0')
                },500)
              } else {
                this.tip = res.msg
                this.tipShow = true
              }
            })
          }else {
            this.$('shop/makeorder', {
              item_id: this.item_id,
              item_num: this.num,
              remark:this.remarks,
              address_id:this.address.id,
              trade_pwd:this.password
            }, res => {
              console.log(res)
              if (res.code === 200) {
                this.alertShow = false
                Toast({
                  message: '交易成功',
                  position: 'middle',
                  duration: 500
                });
                setTimeout(()=>{
                  this.$router.push('/shop/shopCar?car=0')
                },500)
              } else {
                this.tip = res.msg
                this.tipShow = true
              }
            })
          }
        },
        buy(){
          let that = this
          if (localStorage.getItem('is_paypwd') == 0){
            MessageBox.confirm('请先设置交易密码').then(action => {
              that.$router.push('/mine/set_password')
            });
          } else {
            this.remarks = ''
            for (let i = 0; i < this.item.length; i++) {
              if (i===0){
                this.remarks += this.item[i].item_id+'^'+this.item[i].ipt
              } else {
                this.remarks += '|'+this.item[i].item_id+'^'+this.item[i].ipt
              }
            }
            this.alertShow = true
          }
        },
        addaddress(){
          this.$router.push('/mine/add_address')
        },
        getNum(){
          this.price = this.num*this.item[0].price
        },
        close(){
          this.alertShow = false
        },
        less() {
          this.num--
          if (this.num <= 0) {
            this.num = 1
            return false
          }
          this.getNum()
        },
        add() {
          this.num++
          this.getNum()
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
  .boxs{
    width: 355px;
    padding: 12px;
    margin: auto;
    background: #FFFFFF;
    border-radius: 6px;
    margin-bottom: 10px;
  }
  .img_box{
    width: 100px;
    height: 100px;
    margin-right: 10px;
  }
  .item{
    width: 220px;
    line-height: 20px;
  }
  .tit{
    margin-bottom: 10px;
  }
  .num_box{
    width: 93px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #B3B3B3;
    border-radius: 4px;
    text-align: center;
  }
  .num_box span{
    display: inline-block;
    width: 28px;
  }
  .num_box input{
    width: 35px;
    height: 100%;
    border-left: 1px solid #B3B3B3;
    border-right: 1px solid #B3B3B3;
    text-align: center;
  }
  .remarks{
    font-size: 13px;
    line-height: 30px;
  }
  .remarks span{
    display: inline-block;
    width: 45px;
  }
  .remarks input{
    width: 240px;
  }

</style>
