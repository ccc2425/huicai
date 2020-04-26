<template>
    <div>
      <headerBack :title="title"></headerBack>
      <div class="classfys flex_around">
        <div class="pr" :class="{actives:index==0}" @click="chose(0)">购物车</div>
        <div class="pr" :class="{actives:index==1}" @click="chose(1)">购买订单</div>
      </div>
      <div class="zhanwei"></div>
      <div v-if="car">
        <div class="box">
          <div v-for="(item,i) in list" class="list pr">
            <img @click="checkThis(i,item.checkd)" v-if="!item.checkd" class="check_img" src="../../assets/image/c0.png" alt="">
            <img @click="checkThis(i,item.checkd)" v-if="item.checkd" class="check_img" src="../../assets/image/c1.png" alt="">
            <div class="clearfix">
              <div class="fl img_box">
                <img :src="item.master_image" alt="">
              </div>
              <div class="fl item">
                <div class="tit tits texthiddens">{{item.title}}</div>
                <div class="sizes flex_bettwen">
                  <div class="price"><span class="fs15">{{item.price}}</span>HC</div>
                  <div class="num_box">
                    <span @click="less(i)">-</span><input type="number" readonly="true" v-model="item.num"><span @click="add(i)">+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="foot flex_bettwen">
          <div class="chose" @click="allChose">
            <img v-if="!choseAll" class="check_img" src="../../assets/image/c0.png" alt="">
            <img v-if="choseAll" class="check_img" src="../../assets/image/c1.png" alt="">
            {{all}}
          </div>
          <div class="money">
            <div>合计：<span>￥{{money}}</span></div>
            <div class="co999">不含运费</div>
          </div>
          <div class="buy" @click="buy">立即结算</div>
        </div>
      </div>
      <div v-if="!car">
        <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :autoFill="false" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
          <div class="box heights" ref="box">
            <div class="list list2" v-for="item in orderList" @click="openOrderDetail(item.order_id)">
              <div class="list_tit flex_bettwen">
                <div>订单编号 {{item.order_id}}</div>
                <div class="co999">{{item.createtime}}</div>
              </div>
              <div>
                <div class="clearfix mb15" v-for="items in item.items">
                  <div class="fl img_box">
                    <img :src="items.master_image" alt="">
                  </div>
                  <div class="fl item">
                    <div class="tit texthiddens">{{items.title}}</div>
                    <div class="sizes flex_bettwen">
<!--                      <span class="co999">标准白 M码</span>-->
                      <span><span class="fs15">{{items.price}}</span>HC</span>
                      <span>x{{items.num}}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="freight co999">
                运费：<span>{{item.freight_price}}HC</span>
              </div>
              <div class="all">
                <span class="mr5">共1件</span> 合计：<span class="fs15">{{item.score}}</span>HC
              </div>
            </div>
          </div>
        </mt-loadmore>
<!--        <div class="btn_box">-->
<!--          <div class="btn"><img src="../../assets/image/i13.png" alt="">订单客服</div>-->
<!--        </div>-->
      </div>
    </div>
</template>

<script>
    import headerBack from "../../components/headerBack"
    import { Indicator,Toast } from 'mint-ui';
    export default {
      name: "shopCar",
      components:{
        headerBack,
        Indicator,
        Toast
      },
      data(){
          return{
            title:'我的购物',
            index:0,
            car:true,
            num:1,
            list:[],
            choseAll:false,
            all:'全选',
            money:0,
            edata:'',
            edatas:[],
            ids:'',
            topStatus:'',
            orderList:[],
            allLoaded:false,
            page:1,
            pagesize:10,
            state:true
          }
      },
      mounted(){
        Indicator.open('加载中...');
        this.getmain()
        this.getList()
        if (this.$route.query.car == 1){
          this.car = true
          this.index = 0
        } else {
          this.index = 1
          this.car = false
        }
      },
      methods:{
        getmain(){
          this.$('shop/cartlist',{},res=>{
            console.log(res)
            if (res.code === 200){
              this.list = res.data
              Indicator.close();
            }
          })
        },
        getList(){
          this.$('user/order', {page:this.page,pagesize: this.pagesize}, res => {
            console.log(res)
            if (res.code === 200) {
              Indicator.close();
              if (res.data.length<this.pagesize){
                this.state = false
                this.allLoaded = true
              }
              if (this.page ==1){
                this.orderList = res.data
              } else {
                this.orderList.push.apply(this.orderList,res.data)
                this.$refs.loadmore.onBottomLoaded();
              }
              Indicator.close();
            }
          })
        },
        chose(index){
          this.index = index
          if (index == 0 ) {
            this.car = true
          }else {
            this.car = false
          }
        },
        less(i) {
          this.list[i].num--
          if (this.list[i].checkd){
            if (this.list[i].num == -1){
              this.money =this.money
            }else {
              this.money =this.money - parseFloat(this.list[i].price)
            }
          }
          if (this.list[i].num <= 0) {
            this.list[i].num = 0
            return false
          }
        },
        add(i) {
          this.list[i].num++
          if (this.list[i].checkd){
            this.money =this.money + parseFloat(this.list[i].price)
          }
        },
        checkThis(i,type){
          this.list[i].checkd = !type
          if (this.list[i].checkd){
            this.computeAdd(i)
          } else {
            this.computeless(i)
            this.choseAll = false
          }
          for (let j = 0; j < this.list.length; j++) {
            if (!this.list[j].checkd) {
              this.choseAll = false
              return false
            }else {
              this.choseAll = true
            }
          }
        },
        allChose(){
          this.choseAll = !this.choseAll
          if(this.choseAll){
            this.all = '全不选'
          }else {
            this.all = '全选'
          }
          this.money = 0
          for (let i = 0; i < this.list.length; i++) {
            this.list[i].checkd = this.choseAll
            if (this.choseAll) {
              this.money = this.money + parseFloat(this.list[i].price) * this.list[i].num
            }
          }
        },
        computeAdd(i){
          this.money =this.money + parseFloat(this.list[i].price)*this.list[i].num
        },
        computeless(i){
          this.money =this.money - parseFloat(this.list[i].price)*this.list[i].num
        },
        buy(){
          this.edata = '';
          this.edatas= [];
          this.ids = ''
          for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].checkd) {
              this.edatas.push(this.list[i].id +'^'+this.list[i].num)
              this.ids += this.list[i].id + ','
            }else {
              if (this.edatas.indexOf(this.list[i].id +'^'+this.list[i].num)>-1){
                this.edatas.splice(this.edatas.indexOf(this.list[i].id +'^'+this.list[i].num),1)
              }
            }
          }
          for (let j = 0; j < this.edatas.length; j++) {
            if (j===0){
              this.edata += this.edatas[j]
            } else {
              this.edata += '|'+this.edatas[j]
            }
          }
          this.ids = this.ids.substr(0, this.ids.length - 1);
          this.$('shop/editcart',{edata	:this.edata},res=>{
            console.log(res)
            if (res.code === 200){
              this.$router.push('/shop/orderSure?ids='+this.ids+'&cai=1')
            }else {
              Toast({
                message: res.msg,
                position: 'middle',
                duration: 500
              })
            }
          })
        },

        handleTopChange(status) {
          this.topStatus = status;
        },
        loadTop(){
          // if (this.$refs.box.scrollTop == 0){
            this.page = 1
            this.$('user/order', {page:this.page,pagesize: this.pagesize}, res => {
              if (res.code === 200) {
                this.list = res.data
                this.$refs.loadmore.onTopLoaded();
              }
            })
          // }
        },
        loadBottom() {
          if (this.state) {
            this.page++
            this.getList()
          }
        },
        openOrderDetail(id){
          this.$router.push('/shop/orderDetail?id='+id)
        }
      }
    }
</script>

<style scoped>
  .classfys{
    position: fixed;
    top: 50px;
    left: 0;
    width: 100%;
  }
  .zhanwei{
    height: 40px;
  }
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
  .btn img{
    width: 15px;
    height: 15px;
    vertical-align: text-bottom;
    margin-right: 5px;
  }
  .list{
    background: #FFFFFF;
    padding: 10px 10px 10px 38px;
    font-size: 12px;
    border-radius: 6px;
    margin-bottom: 10px;
  }
  .list2{
    padding: 10px;
  }
  .check_img{
    position: absolute;
    top: 45%;
    left: 10px;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
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
  }
  .fs15{
    font-size: 15px;
  }
  .sizes{
    line-height: 18px;
    margin-bottom: 10px;
  }
  .all{
    font-size: 12px;
    text-align: right;
  }
  .mr5{
    margin-right: 5px;
  }
  .freight{
    text-align: right;
    line-height: 20px;
    margin-bottom: 10px;
  }
  .freight span{
    margin-left: 25px;
  }
  .num_box{
    width: 80px;
    height: 24px;
    line-height: 24px;
    border: 1px solid #B3B3B3;
    border-radius: 4px;
    text-align: center;
  }
  .num_box span{
    display: inline-block;
    width: 24px;
  }
  .num_box input{
    width: 30px;
    height: 100%;
    border-left: 1px solid #B3B3B3;
    border-right: 1px solid #B3B3B3;
    text-align: center;
  }
  .tits{
    margin-bottom: 30px;
  }
  .price{
    color: #FB4D4D;
    line-height: 24px;
  }
  .price span{
    font-weight: bold;
  }
  .foot{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 49px;
    border-top: 1px solid #f5f5f5;
    line-height: 49px;
    background: #FFFFFF;
  }
  .chose{
    padding-left: 35px;
  }
  .chose img{
    top: 50%;
  }
  .money{
    line-height: 21px;
    padding: 5px;
  }
  .money span{
    font-size: 15px;
    color: #FA7624;
    font-weight: bold;
  }
  .money div:last-child{
    font-size: 11px;
  }
  .buy{
    width: 127px;
    text-align: center;
    color: #FFFFFF;
    background: linear-gradient(to right,#F7B132,#FA7624);
  }
  .heights{
    height: calc(100vh - 90px);
    overflow-y: scroll;
    padding: 10px;
  }
</style>
