<template>
    <div>
      <div style="background: #FFFFFF">
        <headerBack :title="title"></headerBack>
      </div>
      <div class="box">
        <div class="list">
          <span>设置新密码</span>
          <input type="password" placeholder="请设置交易密码" v-model="password">
        </div>
        <div class="list">
          <span>确认新密码</span>
          <input type="password" placeholder="请确认交易密码" v-model="password1">
        </div>
      </div>
      <div class="btn" @click="sure">确认</div>
      <tishi :tishi="tishi" :tishiShow="tishiShow"></tishi>
    </div>
</template>

<script>
    import headerBack from "../../components/headerBack"
    import tishi from "../../components/tishi"
    export default {
      name: "set_password",
      components:{
        headerBack,
        tishi
      },
      data(){
        return{
          title:'设置交易密码',
          password:'',
          password1:"",
          tishi:'',
          tishiShow:false
        }
      },
      methods:{
        sure(){
          if (!this.password){
            this.tishi = '密码不能为空'
          } else if (this.password!==this.password1) {
            this.tishi = '密码不一致'
          }else {
            this.tishi = '修改成功'
          }
          this.tishiShow = true
          setTimeout(()=>{
            this.tishiShow = false
          },1000)
        }
      }
    }
</script>

<style scoped>
  .box{
    width: 355px;
    margin: 10px auto 20px;
    border-radius: 6px;
    background: #FFFFFF;
  }
  .list{
    padding: 0 15px;
    line-height: 50px;
    border-bottom: 1px solid #F5F5F5;
  }
  .list span{
    display: inline-block;
    width: 75px;
    margin-right: 20px;
  }
</style>
