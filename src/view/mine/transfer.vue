<template>
    <div>
      <div class="header">
        <i @click="back" class="iconfont icon_l">&#xe601;</i>
        <p>我的转让</p>
        <span class="icon_r" @click="record">记录</span>
      </div>
      <div class="zhanwei"></div>
      <div class="classfys flex_around">
        <div class="pr" :class="{actives:index==0}" @click="chose(0)">转让操作</div>
        <div class="pr" :class="{actives:index==1}" @click="chose(1)">接收操作</div>
      </div>
      <div v-if="index==0" class="box">
        <div class="list_box">
          <div class="list">
            <span>接收方ID：</span>
            <input class="ipt" type="text" placeholder="请输入接收方ID" v-model="getId">
          </div>
          <div class="list">
            <span>转让数量：</span>
            <i @click="less" class="iconfont icon_less coccc">&#xe620;</i>
            <input class="num" type="number" v-model="num">
            <i @click="add" class="iconfont icon_add font_color">&#xe621;</i>
          </div>
          <div class="list">
            <span>交易密码：</span>
            <input class="ipt" type="text" placeholder="请输入交易密码">
          </div>
          <div class="list">
            <span>本次交易码：</span>
            <input class="ipt font_color" type="text" readonly="true" value="3526">
          </div>
        </div>
        <div class="text">
          <span class="co333">操作说明：</span>转让数量<span>1个积分起转,</span>每次转让扣除<span>5%</span>手续费。转让方发起转让，先扣除相对应积分到平台；接收方
          <span>60分钟内</span>未完成交易，交易自动取消,转出数量和手续费一起退回到转让方账户。
        </div>
        <div class="btn_boc">
          <div class="btn" @click="upData(0)">提交</div>
        </div>
      </div>
      <div v-if="index==1" class="box">
        <div class="list_box">
          <div class="list">
            <span>转出方ID：</span>
            <input class="ipt" type="text" placeholder="请输入接收方ID" v-model="outId">
          </div>
          <div class="list">
            <span>转出数量：</span>
            <input class="ipt font_color" type="text" readonly="true" v-model="outNum">
          </div>
          <div class="list">
            <span>本次交易码：</span>
            <input class="ipt" type="text" placeholder="请输入本次交易接收码">
          </div>
        </div>
        <div class="text">
          <span class="co333">操作说明：</span>转让数量<span>1个积分起转,</span>每次转让扣除<span>5%</span>手续费。转让方发起转让，先扣除相对应积分到平台；接收方
          <span>60分钟内</span>未完成交易，交易自动取消,转出数量和手续费一起退回到转让方账户。
        </div>
        <div class="btn_boc">
          <div class="btn" @click="upData(1)">提交</div>
        </div>
      </div>
      <alert3 v-if="alertShow" :text="text" :state="state" @getAlert="fromAlert"></alert3>
    </div>
</template>

<script>
    import alert3 from "../../components/alert/alert3"
    export default {
      name: "transfer",
      components:{
        alert3
      },
      data(){
        return{
          index:0,
          num:10,
          getId:'',
          outId:'JK26432',
          outNum:3000,
          alertShow:false,
          text:'交易码正确，积分已到您账户余额',
          state:true,
        }
      },
      methods:{
        back(){
          this.$router.go(-1)
        },
        chose(index){
          this.index = index
        },
        less(){
          this.num --
          if(this.num<=0){
            this.num = 0
            return false
          }
        },
        add(){
          this.num ++
        },
        upData(index){
          this.alertShow = true
          if (index==0){
            this.text = '交易码正确，积分已到您账户余额'
            this.state = true
          } else {
            this.text = '交易码错误，请重新输入交易码'
            this.state = false
          }
        },
        fromAlert(){
          this.alertShow = false
        },
        record(){
          this.$router.push('/mine/record')
        }
      }
    }
</script>

<style scoped>
  .header{
    z-index: 999;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 15px;
    color: #333333;
    font-weight: bold;
    background: #ffffff;
  }
  .header .iconfont,.header span{
    position: absolute;
    top: 0;
    font-weight: normal;
  }
  .icon_l{
    font-size: 20px;
    left: 10px;
  }
  .icon_r{
    right: 16px;
  }
  .zhanwei{
    height: 45px;
  }
  .box{
    padding: 10px;
  }
  .list_box{
    width: 355px;
    padding: 0 20px;
    background: #FFFFFF;
    border-radius: 6px;
    line-height: 50px;
    font-size: 14px;
  }
  .list{
    border-bottom: 1px solid #F5F5F5;
  }
  .list span{
    display: inline-block;
    width: 90px;
    margin-right: 2px;
  }
  .list .ipt{
    width: 180px;
    height: 100%;
  }
  .num{
    width: 30px;
    margin: 0px 10px;
    text-align: center;
    color: #FA7624;
  }
  .text{
    padding: 15px 5px;
    color: #999999;
    line-height: 20px;
    font-size: 12px;
  }
  .text span{
    color: #FA7624;
  }
  .text .co333{
    color: #333333;
  }
  .btn_boc{
    position: fixed;
    bottom: 35px;
    left: 0;
    width: 100%;
  }
</style>
