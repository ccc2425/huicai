<template>
  <div>
    <headerBack :title="title"></headerBack>
    <div class="box">
      <div v-if="none">
        <div class="list_box">
          <div class="list">
            <span>转出方ID：</span>
            <input class="ipt" type="text" placeholder="暂无接收记录" v-model="sole_id" readonly="true">
          </div>
          <div class="list">
            <span>转出数量：</span>
            <input class="ipt font_color" type="text" readonly="true" v-model="score" placeholder="暂无接收记录">
          </div>
          <div class="list">
            <span>发起时间：</span>
            <input class="ipt" type="text" readonly="true" v-model="createtime" placeholder="暂无接收记录">
          </div>
          <div class="list pr">
            <span>本次交易码：</span>
            <input class="ipt" type="text" placeholder="请及时输入交易码，有效时长仅20分钟" v-model="ipt">
          </div>
        </div>
      </div>
      <div class="img_box" v-if="!none">
        <img src="../../assets/image/b2.png" alt="">
      </div>
<!--      <div class="text">-->
<!--        <span class="co333">操作说明：</span>转让数量<span>1个积分起转,</span>每次转让扣除<span>5%</span>手续费。转让方发起转让，先扣除相对应积分到平台；接收方-->
<!--        <span>60分钟内</span>未完成交易，交易自动取消,转出数量和手续费一起退回到转让方账户。-->
<!--      </div>-->
      <div class="btn_boc">
        <div class="btn" @click="upData()">提交</div>
      </div>
    </div>
    <alert3 v-if="alertShow" :text="text" :state="state" :tishi="tishi" @getAlert="fromAlert"></alert3>
  </div>
</template>

<script>

  import headerBack from "../../components/headerBack"
  import alert3 from "../../components/alert/alert3"
  import { MessageBox } from 'mint-ui'
  export default {
    name: "receive",
    components:{
      headerBack,
      alert3,
      MessageBox
    },
    data(){
      return{
        title:'接收操作',
        num:'',
        getId:'',
        outId:'',
        outNum:'',
        alertShow:false,
        text:'交易码正确，积分已到您账户余额',
        state:'',
        password:'',
        tishi:false,
        id:'',
        trans_code:'',
        none:true,
        list:[],
        sole_id:'',
        score:'',
        ipt:'',
        createtime:''
      }
    },
    mounted(){
      this.tishi = false
      this.text = '请与推荐人或者代理中心交易，出现纠纷后果自负！'
      this.state = 4
      this.alertShow = true
      let info = JSON.parse(localStorage.getItem('receive'))
      console.log(info)
      this.score = info.score
      this.sole_id = info.sole_id
      this.createtime = info.createtime
      this.id = info.id
    },
    methods:{
      back(){
        this.$router.go(-1)
      },
      chose(index){
        this.index = index
      },
      upData(){
        let that = this
        if (localStorage.getItem('is_real')==0){
          MessageBox.confirm('请完成实名认证').then(action => {
            that.$router.push('/mine/realname')
          });
        } else {
          this.$('user/endtrans', {trans_id: this.id, trans_code: this.ipt}, res => {
            console.log(res)
            if (res.code === 200) {
              this.tishi = false
              this.text = res.msg
              this.state = 2
              this.alertShow = true
              this.$store.state.backs = '11'
              this.$router.go(-1)
            } else {
              this.tishi = false
              this.text = res.msg
              this.state = 3
              this.alertShow = true
            }
          })
        }
      },
      fromAlert(data){
        this.alertShow = false
        if (data === 'sucess') {
          this.$router.go(-1)
        }
      },
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
    margin-bottom: 10px;
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
  /*.btn_boc{*/
  /*  position: fixed;*/
  /*  bottom: 35px;*/
  /*  left: 0;*/
  /*  width: 100%;*/
  /*}*/
  .img_box{
    width: 100%;
  }
  .btns{
    position: absolute;
    top: 9px;
    right: 0;
    width: 80px;
    height: 32px;
    line-height: 32px;
  }
</style>
