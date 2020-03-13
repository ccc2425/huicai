<template>
    <div>
      <div class="box">
        <div class="clearfix mb15">
          <div class="fl img_box">
            <img src="../assets/image/item1.png" alt="">
          </div>
          <div class="fl item">
            <div class="tit texthiddens">春款新品休闲连帽卫衣百搭单品春款新品休闲连帽卫衣百搭单品春款新品休闲连帽卫衣百搭单品</div>
            <div class="sizes flex_bettwen">
              <span class="co999">标准白 M码</span>
              <span>99.00HC</span>
            </div>
          </div>
        </div>
        <div class="flex_bettwen mb15">
          <div class="lh30">购买数量</div>
          <div v-if="type" class="num_box">
            <span @click="less">-</span><input type="number" readonly="true" v-model="num"><span @click="add">+</span>
          </div>
          <div v-if="!type">x1</div>
        </div>
        <div class="mb15">
          <div class="flex_bettwen pr send_type">
            <div>
              <p>配送方式</p>
            </div>
            <div v-if="type" @click="close">
              <input type="text" class="ad iptcob" placeholder="配送选择" readonly="true" v-model="sendType">
              <i class="iconfont icon">&#xe623;</i>
            </div>
            <div v-if="!type" class="co999">
              普通快递
            </div>
          </div>
          <p class="shuoming">工作日/双休日与节假日均可配送</p>
        </div>
        <div class="remarks">
          <span>备注</span>
          <input v-if="type" type="text" placeholder="建议留言前先与客服沟通">
          <input v-if="!type" type="text" v-model="beizhu" disabled>
        </div>
      </div>
      <div class="foots" v-if="footShow">
        <div class="bg" @click="close"></div>
        <div class="foot_box">
          <div class="foot_tit">配送选择</div>
          <div class="foot_list pr" @click.stop="choseThis(1,'普通快递')" :class="{chose:choseShow==1}">普通快递<i class="iconfont foot_icon" v-if="choseShow==1">&#xe610;</i></div>
          <div class="foot_list pr" @click.stop="choseThis(2,'高级快递')" :class="{chose:choseShow==2}">高级快递<i class="iconfont foot_icon" v-if="choseShow==2">&#xe610;</i></div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "item_detail",
      props:['type','beizhu'],
      data(){
          return{
            num:1,
            sendType:'',
            footShow:false,
            choseShow:0,
          }
      },
      methods: {
        less() {
          this.num--
          if (this.num <= 0) {
            this.num = 0
            return false
          }
        },
        add() {
          this.num++
        },
        choseThis(index,text){
          this.choseShow = index
          this.sendType = text;
          this.footShow = false;
        },
        close(){
          this.footShow = !this.footShow
        }
      }
    }
</script>

<style scoped>
  .box{
    width: 355px;
    padding: 12px;
    margin: auto;
    background: #FFFFFF;
    border-radius: 6px;
  }
  .img_box{
    width: 100px;
    height: 100px;
    margin-right: 10px;
  }
  .item{
    width: 220px;
    line-height: 20px;
  }
  .tit{
    margin-bottom: 10px;
  }
  .sizes span.co999{
    font-size: 12px;
  }
  .num_box{
    width: 93px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #B3B3B3;
    border-radius: 4px;
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
  .ad{
    width: 120px;
    text-align: right;
  }
  .icon{
    position: absolute;
    top: 0px;
    right: 0;
    font-size: 10px;
    color: #B3B3B3;
  }
  .send_type{
    line-height: 20px;
    font-size: 13px;
  }
  .send_type input{
    padding-right: 25px;
  }
  .send_type p{
    line-height: 20px;
  }
  .shuoming{
    font-size: 12px;
    color: #B3B3B3;
  }
  .remarks{
    font-size: 13px;
    line-height: 30px;
  }
  .remarks span{
    display: inline-block;
    width: 45px;
  }
  .remarks input{
    width: 240px;
  }
  .foots{
    z-index: 9;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.7);
  }
  .bg{
    width: 100%;
    height: 100%;
  }
  .foot_box{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background: #FFFFFF;
    padding: 20px 20px 0 20px;
  }
  .foot_tit{
    font-size: 17px;
    text-align: center;
    font-weight: bold;
    margin-bottom: 31px;
  }
  .foot_list{
    line-height: 50px;
  }
  .foot_icon{
    position:absolute;
    right: 0;
  }
  .chose{
    color: #FA7624;
  }
</style>
