<template>
    <div>
      <headerBack :title="title"></headerBack>
      <div class="box">
        <div class="hasaddress clearfix">
          <div class="fl user_img">
            <img src="../../assets/image/i12.png" alt="">
          </div>
          <div class="fl info">
            <div>{{info.add_name}} {{info.add_tel}}</div>
            <div class="address co999">{{info.address}}
            </div>
          </div>
        </div>
      </div>
      <div class="box flex_bettwen">
          <div>支付方式</div>
          <div>积分支付</div>
      </div>
      <div class="mb10">
        <item_detail :type="type" :beizhu="beizhu" :items="items"></item_detail>
      </div>
      <div class="box">
        <div class="list flex_bettwen">
          <div>商品金额</div>
          <div>{{info.itme_price}}HC</div>
        </div>
        <div class="list flex_bettwen">
          <div>运费</div>
          <div>{{info.freight_price}}HC</div>
        </div>
        <div class="list flex_bettwen">
          <div>实付积分</div>
          <div class="interval"><span>{{info.balance}}</span>HC</div>
        </div>
      </div>
      <div class="box mab60">
          <div class="orderform pr">
            <span class="order_name">订单编号</span>
            <span class="order_time">{{info.order_id}}</span>
            <span class="copy" :data-clipboard-text="info.order_id" @click="copy">复制</span>
          </div>
          <div class="orderform">
            <span class="order_name">下单时间</span>
            <span class="order_time">{{info.createtime}}</span>
          </div>
      </div>
      <div class="btn_box">
        <div class="btn" @click="openserve(info.order_id)"><img src="../../assets/image/i13.png" alt="">订单客服</div>
      </div>
    </div>
</template>

<script>
    import Clipboard from 'clipboard'
    import headerBack from "../../components/headerBack"
    import item_detail from "../../components/item_detail"
    import { Toast  } from 'mint-ui';
    export default {
      name: "orderDetail",
      components:{
        headerBack,
        item_detail,
        Toast
      },
      data(){
          return{
            title:'订单详情',
            type:false,
            beizhu:'线头都处理好',
            order_id:this.$route.query.id,
            info:[],
            items:[],
            time:'',
          }
      },
      mounted() {
        this.getmain()
      },
      methods:{
        getmain(){
          this.$('user/orderdes',{order_id:this.order_id},res=>{
            console.log(res)
            if (res.code === 200){
              this.info = res.data
              this.items = res.data.items
            }
          })
        },
        copy(){
          var clipboard = new Clipboard('.copy')
          clipboard.on('success', e => {
            Toast({
              message: '复制成功'
            })
            //释放内存
            clipboard.destroy()
          })
          clipboard.on('error', e => {
            // 不支持复制
            Toast({
              message: '手机权限不支持复制功能'
            })
            // 释放内存
            clipboard.destroy()
          })
        },
        openserve(id){
          let list = this.items[0];
          list.createtime = this.info.createtime
          list.order_id = this.info.order_id
          localStorage.setItem('order_item',JSON.stringify(list))
          this.$router.push('/shop/service?id='+id)
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
