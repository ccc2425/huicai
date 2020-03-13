<template>
    <div>
      <div style="background: #FFFFFF">
        <headerBack :title="title"></headerBack>
      </div>
      <div class="box">
        <div class="list">
          <span>推荐人ID：</span>
          <input type="text" placeholder="请输入推荐人ID">
        </div>
        <div class="list">
          <span>真实姓名：</span>
          <input type="text" placeholder="请输入您的真实姓名">
        </div>
        <div class="list">
          <span>手机号码：</span>
          <input type="text" placeholder="请输入您的手机号">
        </div>
        <div class="list">
          <span>身份证号码：</span>
          <input type="text" placeholder="请输入您的身份证号码">
        </div>
      </div>
      <div v-if="realState" class="btn">提交认证</div>
      <div v-if="!realState" class="btns btned">已认证</div>
    </div>
</template>

<script>
    import headerBack from '../../components/headerBack'
    export default {
      name: "realname",
      components:{
        headerBack
      },
      data(){
        return{
          title:'实名认证',
          realState:true
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
    width: 90px;
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
