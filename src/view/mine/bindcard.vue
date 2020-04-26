<template>
    <div>
    <div style="background: #FFFFFF">
      <headerBack :title="title"></headerBack>
    </div>
    <div class="box">
      <div class="list">
        <span>银行卡号</span>
        <input type="number" placeholder="请输入银行卡号" v-model="bank_no">
      </div>
      <div class="list">
        <span>开户行</span>
        <input type="text" placeholder="请输入开户行" v-model="bank_name">
      </div>
      <div class="list">
        <span>卡户姓名</span>
        <input type="text" placeholder="请输入卡户姓名" v-model="bank_user">
      </div>
    </div>
    <div class="btn" @click="upData">确认</div>
  </div>
</template>

<script>
    import headerBack from '../../components/headerBack'
    import { Toast } from 'mint-ui'
    export default {
      name: "bindcard",
      components:{
        headerBack,
        Toast,
      },
      data(){
        return{
          title:'绑定银行卡',
          bank_no:'',
          bank_name:'',
          bank_user:'',
        }
      },
      mounted() {
      },
      methods:{
        upData(){
          if (!this.bank_no||!this.bank_name||!this.bank_user){
            Toast({
              message: '请先完善个人信息',
              position: 'middle',
              duration: 500
            });
          } else {
              this.$('user/bandbank', {bank_no:this.bank_no,bank_name:this.bank_name,bank_user:this.bank_user}, res => {
                console.log(res)
                if (res.code === 200) {
                  Toast({
                    message: res.msg,
                    position: 'middle',
                    duration: 1000
                  });
                  setTimeout(()=>{
                    this.$router.go(-1)
                  },1000)
                }else {
                  Toast({
                    message: res.msg,
                    position: 'middle',
                    duration: 500
                  });
                }
              })
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

