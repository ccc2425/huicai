<template>
  <div class="bg">
    <div class="alert">
      <div class="title">向 [{{info.mobile}}] 出售</div>
      <div class="text">
        <div>出售数量：<span>{{info.score}}</span></div>
        <div>线下支付：<span>￥{{info.balance}}</span></div>
        <div>交易密码：<input class="iptcob ipt" type="text" placeholder="请输入交易密码" v-model="password"></div>
      </div>
      <div class="btn_box flex_around">
        <div class="btns btn_l" @click="close">取消</div>
        <div class="btns btn_r" @click="sure">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Toast  } from 'mint-ui';
  export default {
    name: "alert6",
    components:{
      Toast
    },
    data(){
      return{
        password:'',
        // tipShow:false,
        // text:'',
        // nums:localStorage.getItem('score')
      }
    },
    props:['info'],
    methods:{
      sure(){
        if (!this.password){
          Toast({
            message: '请输入交易密码',
            position: 'middle',
            duration: 1000
          });
          return false
        } else {
          // this.$('advert/release', {ad_id:this.datas.ad_id,title:this.datas.tit,master_img:this.datas.imgList,content:this.datas.context,type:this.datas.choseIpts,put_score:this.datas.num,trade_pwd:this.password}, res => {
          //   console.log(res)
          //   if (res.code === 200) {
              this.$emit('getAlert',this.password)
          //     localStorage.setItem('score',this.nums - this.datas.num)
          //     this.$router.push('/business/myad')
          //   }else {
          //     Toast({
          //       message: res.msg,
          //       position: 'middle',
          //       duration: 1000
          //     });
          //   }
          // })
        }
      },
      close(){
        this.$emit('getAlertClose',false)
      }
    }
  }
</script>

<style scoped>
  .bg{
    z-index: 999;
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
  .text div{
    line-height: 36px;
  }
  .text span{
    color: #FB7A27;
    font-weight: bold;
  }
  .ipt{
    width: 185px;
    height: 30px;
    line-height: 30px;
    padding: 0 14px;
    border-radius: 3px;
    background: #EFEFEF;
  }

  .btns{
    width: 100px;
    height: 33px;
    font-size: 15px;
    line-height: 33px;
    border-radius: 6px;
    text-align: center;
  }
  .btn_l{
    color: #B3B3B3;
    background: #E6E6E6;
  }
  .btn_r{
    color: #FFFFFF;
    background: linear-gradient(to right,#FDAE4A,#FA7624);
  }
</style>
