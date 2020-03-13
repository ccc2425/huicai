<template>
    <div>
      <headerShare :title="title"></headerShare>
      <itemBanner></itemBanner>
      <div class="box">
        <div class="box_in">
          <div class="tit">2020春季新款时尚半开襟宽松立领卫衣女</div>
          <div class="integral pr"><span>200</span>.00HC <img class="jifen" src="../../assets/image/a1.png" alt=""></div>
          <div class="num_box">
            <span @click="less">-</span><input type="number" readonly="true" v-model="num"><span @click="add">+</span>
          </div>
        </div>
      </div>
      <div class="box padb60">
        <img src="../../assets/image/ban1.png" alt="">
      </div>
      <div class="foot flex_bettwen">
        <div @click="addCar">加入购物车</div>
        <div @click="buy">立即购买</div>
      </div>
    </div>
</template>

<script>
    import headerShare from '../../components/headerShare'
    import itemBanner from '../../components/itemBanner'
    export default {
      name: "item",
      components:{
        headerShare,
        itemBanner
      },
      data(){
        return{
          title:'商品详情',
          num:1
        }
      },
      methods:{
        less(){
          this.num--
          if (this.num<=0){
            this.num = 0
            return false
          }
        },
        add(){
          this.num++
        },
        buy(){
          this.$router.push('/shop/orderSure')
        },
        addCar(){
          this.$router.push('/shop/shopCar')
        }
      }
    }
</script>

<style scoped>
  .box{
    background: #FFFFFF;
    padding: 10px;
    margin-bottom: 5px;
  }
  .padb60{
    padding-bottom: 60px;
  }
  .box_in{
    padding: 10px 0 18px;
    text-align: center;
  }
  .tit{
    font-size: 17px;
    line-height: 24px;
    margin-bottom: 15px;
    font-weight: bold;
  }
  .integral{
    color: #FB4D4D;
  }
  .integral span{
    font-size: 24px;
    font-weight: bold;
  }
  .num_box{
    width: 93px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #B3B3B3;
    border-radius: 4px;
    margin: auto;
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
  .jifen{
    position: absolute;
    top: -3px;
    width: 25px;
    height: 13px;
  }
  .foot{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: linear-gradient(to right,#F7B132,#FA7624);
    color: #FFFFFF;
    font-size: 16px;
    text-align: center;
  }
  .foot>div{
    width: 50%;
  }
  .foot>div:first-child{
    border-right: 1px solid #FFFFFF;
  }
</style>
