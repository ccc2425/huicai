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
                <img :src="item.img" alt="">
              </div>
              <div class="fl item">
                <div class="tit tits texthiddens">{{item.tit}}</div>
                <div class="sizes flex_bettwen">
                  <div class="price"><span class="fs15">{{item.price}}</span>.00HC</div>
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
          <div class="buy">立即结算</div>
        </div>
      </div>
      <div v-if="!car">
        <div class="box">
          <div class="list">
            <div class="list_tit flex_bettwen">
              <div>订单编号 23658954622</div>
              <div class="co999">2020-03-04  11:25</div>
            </div>
            <div>
              <div class="clearfix mb15">
                <div class="fl img_box">
                  <img src="../../assets/image/item1.png" alt="">
                </div>
                <div class="fl item">
                  <div class="tit texthiddens">春款新品休闲连帽卫衣百搭单品春款新品休闲连帽卫衣百搭单品春款新品休闲连帽卫衣百搭单品</div>
                  <div class="sizes flex_bettwen">
                    <span class="co999">标准白 M码</span>
                    <span><span class="fs15">99</span>.00HC</span>
                  </div>
                  <div>x1</div>
                </div>
              </div>
            </div>
            <div class="freight co999">
              运费：<span>10.00HC</span>
            </div>
            <div class="all">
              <span class="mr5">共1件</span> 合计：<span class="fs15">99</span>.00HC
            </div>
          </div>
          <div class="list">
            <div class="list_tit flex_bettwen">
              <div>订单编号 23658954622</div>
              <div class="co999">2020-03-04  11:25</div>
            </div>
            <div>
              <div class="clearfix mb15">
                <div class="fl img_box">
                  <img src="../../assets/image/item1.png" alt="">
                </div>
                <div class="fl item">
                  <div class="tit texthiddens">春款新品休闲连帽卫衣百搭单品春款新品休闲连帽卫衣百搭单品春款新品休闲连帽卫衣百搭单品</div>
                  <div class="sizes flex_bettwen">
                    <span class="co999">标准白 M码</span>
                    <span><span class="fs15">99</span>.00HC</span>
                  </div>
                  <div>x1</div>
                </div>
              </div>
              <div class="clearfix mb15">
                <div class="fl img_box">
                  <img src="../../assets/image/item1.png" alt="">
                </div>
                <div class="fl item">
                  <div class="tit texthiddens">春款新品休闲连帽卫衣百搭单品春款新品休闲连帽卫衣百搭单品春款新品休闲连帽卫衣百搭单品</div>
                  <div class="sizes flex_bettwen">
                    <span class="co999">标准白 M码</span>
                    <span><span class="fs15">99</span>.00HC</span>
                  </div>
                  <div>x1</div>
                </div>
              </div>
            </div>
            <div class="freight co999">
              运费：<span>10.00HC</span>
            </div>
            <div class="all">
              <span class="mr5">共1件</span> 合计：<span class="fs15">99</span>.00HC
            </div>
          </div>
        </div>
        <div class="btn_box">
          <div class="btn"><img src="../../assets/image/i13.png" alt="">订单客服</div>
        </div>
      </div>
    </div>
</template>

<script>
    import headerBack from "../../components/headerBack"

    export default {
      name: "shopCar",
      components:{
        headerBack
      },
      data(){
          return{
            title:'我的购物',
            index:0,
            car:true,
            num:1,
            list:[
              {img:require("../../assets/image/item1.png"),tit:"春款新品休闲连帽卫衣百搭单品春款新",price:'99',num:1,checkd:false},
              {img:require("../../assets/image/item1.png"),tit:"春款新品休闲连帽卫衣百搭单品春款新",price:'99',num:1,checkd:false},
              {img:require("../../assets/image/item1.png"),tit:"春款新品休闲连帽卫衣百搭单品春款新",price:'99',num:1,checkd:false},
            ],
            choseAll:false,
            all:'全选',
            money:0
          }
      },
      methods:{
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
</style>
