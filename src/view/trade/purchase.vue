<template>
    <div>
      <headerBack :title="title"></headerBack>
      <div class="box">
        <div class="mb10">
          <span class="name">买入数量</span>
          <input type="number" placeholder="请输入购买数量" v-model="num">
        </div>
        <div class="mb10">
          <div class="flex_bettwen">
            <span>今日市价</span>
            <span>￥{{rate_now}}</span>
          </div>
          <div class="flex_bettwen">
            <span>购买总价</span>
            <span>￥{{getAllPrice}}</span>
          </div>
        </div>
        <div class="">
          <span class="name">交易密码</span>
          <input type="number" placeholder="请输入交易密码" v-model="password">
        </div>
      </div>
      <div class="btn" @click="upDAata">确认</div>
    </div>
</template>

<script>
    import headerBack from "../../components/headerBack"
    import { Toast  } from 'mint-ui';
    export default {
      name: "purchase",
      components:{
        headerBack,
        Toast
      },
      data(){
        return{
          title:'HC购买',
          rate_now:'',
          num:"",
          all_price:"",
          password:'',
          state:true
        }
      },
      mounted() {
        this.rate_now = this.$route.query.rate_now
      },
      methods:{
        upDAata(){
          if (this.state){
            this.state = false
            this.$('score/wantbuy',{score	:this.num,trade_pwd:this.password},res=>{
              console.log(res)
              if (res.code === 200){
                Toast({
                  message: res.msg,
                  position: 'middle',
                  duration: 1000
                });
                setTimeout(()=>{
                  this.state = true
                  this.$router.go(-1)
                },1000)
              }
            })
          } else {
            return false
          }

        }
      },
      computed:{
        getAllPrice(){
          if (this.num == ''){
            this.all_price = 0
          } else {
            this.all_price = parseFloat(this.num)*parseFloat(this.rate_now)
          }
          return this.all_price
        }
      }
    }
</script>

<style scoped>
  .box{
    padding: 11px 10px;
  }
  .box>div{
    padding: 0 20px 0 10px;
    background: #FFFFFF;
    border-radius: 4px;
    line-height: 50px;
  }
  .name{
    display: inline-block;
    width: 80px;
  }
  input{
    width: 200px;
    padding: 0 5px;
    line-height: 50px;
  }
  .btn{
    width: 330px;
  }
</style>
