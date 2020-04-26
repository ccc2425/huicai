<template>
    <div>
      <div style="background: #FFFFFF">
        <headerBack :title="title"></headerBack>
      </div>
      <div class="box">
        <div v-if="is_recom" class="list">
          <span>推荐人ID：</span>
          <input type="text" placeholder="请输入推荐人ID" v-model="rsole_id" :readonly="readly">
        </div>
        <div class="list">
          <span>真实姓名：</span>
          <input type="text" placeholder="请输入您的真实姓名" v-model="realname" :readonly="readly">
        </div>
        <div class="list">
          <span>手机号码：</span>
          <input type="text" placeholder="请输入您的手机号" v-model="mobile" :readonly="readly">
        </div>
        <div class="list">
          <span>身份证号码：</span>
          <input type="text" placeholder="请输入您的身份证号码" v-model="id_card" :readonly="readly">
        </div>
        <div class="list">
          <span>微信账号：</span>
          <input type="text" placeholder="请输入您的微信账号" v-model="wx_id" :readonly="readly">
        </div>
        <div class="list">
          <span>支付宝账号：</span>
          <input type="text" placeholder="请输入您的支付宝账号" v-model="ali_id" :readonly="readly">
        </div>
      </div>
      <div v-if="realState" class="btn" @click="upData">提交认证</div>
      <div v-if="!realState" class="btns btned">已认证</div>
    </div>
</template>

<script>
    import headerBack from '../../components/headerBack'
    import { MessageBox,Toast,Indicator  } from 'mint-ui'
    export default {
      name: "realname",
      components:{
        headerBack,
        MessageBox,
        Toast,
        Indicator
      },
      data(){
        return{
          title:'实名认证',
          realState:false,
          rsole_id:'',
          realname:'',
          mobile:'',
          id_card:'',
          wx_id:'',
          ali_id:'',
          readly:false,
          is_recom:false
        }
      },
      mounted() {
        this.getmain()
      },
      methods:{
        getmain(){
          this.$('user/realinfo', {}, res => {
            console.log(res)
            if (res.code === 200) {
              if (res.data.is_real == 1){
                this.realState = false
                this.rsole_id = res.data.rsole_id
                this.realname = res.data.realname
                this.mobile = res.data.mobile
                this.id_card = res.data.id_card
                this.wx_id = res.data.wx_acct
                this.ali_id = res.data.ali_acct
                this.readly = true
              }else {
                this.readly = false
                this.realState = true
              }
            }
            if(res.data.is_recom == 1){
              this.is_recom = false
            }else {
              this.is_recom = true
            }
          })
        },
        upData(){
          if (!this.realname||!this.mobile||!this.id_card||!this.wx_id||!this.ali_id){
            Toast({
              message: '请先完善个人信息',
              position: 'middle',
              duration: 500
            });
          } else {
            MessageBox.confirm('资料提交认证后不能修改，请核实资料慎重提交！').then(action => {
              Indicator.open('提交中...');
              this.$('user/setreal', {mobile:this.mobile,realname:this.realname,id_card:this.id_card,rsole_id:this.rsole_id,wx_acct:this.wx_id,ali_acct:this.ali_id}, res => {
                console.log(res)
                Indicator.close();
                if (res.code === 200) {
                  Toast({
                    message: res.msg,
                    position: 'middle',
                    duration: 500
                  });
                  localStorage.setItem('is_real',1)
                  window.location.reload()
                }else {
                  Toast({
                    message: res.msg,
                    position: 'middle',
                    duration: 500
                  });
                }
              })
            });
          }
        }
      }
    }
</script>

<style scoped>
  .box{
    width: 355px;
    padding: 0 10px;
    margin: 10px auto 23px;
    background: #FFFFFF;
    border-radius: 6px;
    line-height: 50px;
  }
  .list{
    border-bottom: 1px solid #F5F5F5;
  }
  .list span{
    display: inline-block;
    width: 100px;
    margin-right: 2px;
  }
  .list input{
    width: 180px;
    height: 100%;
  }
  .btns{
    width: 330px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    border-radius: 6px;
    margin: auto;
  }
  .btn{
    background: linear-gradient(to right,#F7AE32,#FA7624);
    color: #FFFFFF;
  }
  .btned{
    background: #DBDBDB;
    color: #999999;
    font-weight: bold;
  }
</style>
