<template>
    <div>
      <headerBack :title="title"></headerBack>
      <itemBanner :banner="banner"></itemBanner>
      <div class="box">
        <div class="box_in">
          <div class="tit">{{list.title}}</div>
          <div class="integral pr"><span>{{list.price}}</span>HC <img class="jifen" src="../../assets/image/a1.png" alt=""></div>
          <div class="num_box">
            <span @click="less">-</span><input type="number" readonly="true" v-model="num"><span @click="add">+</span>
          </div>
        </div>
      </div>
      <div class="box padb60" v-html="list.detail">
      </div>
      <div class="foot flex_bettwen">
        <div @click="addCar">加入购物车</div>
        <div @click="buy">立即购买</div>
      </div>
    </div>
</template>

<script>
    import headerBack from '../../components/headerBack'
    import itemBanner from '../../components/itemBanner'
    import { Toast , Indicator } from 'mint-ui';
    export default {
      name: "item",
      components:{
        headerBack,
        itemBanner,
        Toast,
        Indicator
      },
      data(){
        return{
          title:'商品详情',
          num:1,
          id:this.$route.query.id,
          list:'',
          banner:[],
        }
      },
      mounted(){
        this.getmain()
      },
      methods:{
        getmain(){
          this.$('shop/info',{item_id:this.id},res=>{
            console.log(res)
            if (res.code === 200){
              this.list = res.data
              this.banner = res.data.imgs
            }
          })
        },
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
          this.$router.push('/shop/orderSure??ids='+this.id+'&num='+this.num)
        },
        addCar(){
          Indicator.open();
          this.$('shop/addcart',{item_id:this.id,num:this.num},res=>{
            Indicator.close();
            if (res.code === 200){
              this.$router.push('/shop/shopCar?car=1')
            }else {
              Toast({
                message: '添加失败',
                position: 'middle',
                duration: 500
              });
            }
          })
        }
      }
    }
</script>

<style scoped>
  .box{
    width: 375px;
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
    margin-bottom: 10px;
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
    width: 25px!important;
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
