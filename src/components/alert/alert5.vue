<template>
  <div class="bg">
    <div class="alert">
      <img @click="close" class="cansel" src="../../assets/image/i3.png" alt="">
      <div class="title">支付操作</div>
      <div class="text">
        <input class="iptcob ipt" type="text" placeholder="请输入交易密码" v-model="password">
      </div>
      <div v-if="tipShow" class="tip">* {{text}}</div>
      <div class="btns" @click="sure">确定</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "alert5",
    data(){
      return{
        password:'',
        tipShow:false,
        text:'',
        nums:localStorage.getItem('score')
      }
    },
    props:['datas'],
    methods:{
      sure(){
        if (!this.password){
          this.text = '请输入交易密码'
          this.tipShow = true
          return false
        } else {
          this.$('advert/release', {ad_id:this.datas.ad_id,title:this.datas.tit,master_img:this.datas.imgList,content:this.datas.context,type:this.datas.choseIpts,put_score:this.datas.num,trade_pwd:this.password}, res => {
            console.log(res)
            if (res.code === 200) {
              this.$emit('getAlert',this.password)
              localStorage.setItem('score',this.nums - this.datas.num)
              this.$router.push('/business/myad')
            }else {
              this.tipShow = true
              this.text = res.msg
            }
          })
        }
      },
      close(){
        this.$emit('getAlert',this.password)
      }
    }
  }
</script>

<style scoped>
  .bg{
    position: fixed;
    top: 45px;
    left: 0;
    width: 100%;
    height: calc(100vh - 45px);
    background: rgba(0,0,0,.6);
  }
  .alert{
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 300px;
    background: #ffffff;
    border-radius: 6px;
    padding: 17px 20px;
    text-align: center;
  }
  .cansel{
    position: absolute;
    top: 0;
    right: 0;
    width: 33px;
    height: 33px;
  }
  .title{
    font-size: 17px;
    text-align: center;
    font-weight: bold;
    margin-bottom: 20px;
    margin-top: 5px;
  }
  .text{
    margin-bottom: 10px;
  }
  .ipt{
    width: 100%;
    height: 36px;
    line-height: 36px;
    padding: 0 14px;
    border-radius: 36px;
    background: #F5F5F5;
  }
  .tip{
    font-size: 12px;
    color: #FB4D4D;
    text-align: left;
    line-height: 32px;
    margin-bottom: 10px;
  }
  .btns{
    font-size: 16px;
    line-height: 35px;
    width: 250px;
    border-radius: 6px;
    background: linear-gradient(to right,#F7AB30,#FA7624);
    color: #FFFFFF;
  }
</style>
