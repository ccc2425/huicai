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
      <div class="zhanweis"></div>
      <div v-if="index==0" class="box">
        <div class="list_box">
          <div class="list">
            <span>接收方ID：</span>
            <input class="ipt iptcob" type="text" placeholder="请输入接收方ID" v-model="getId">
          </div>
          <div class="list">
            <span>转让数量：</span>
            <input class="ipt iptcob" type="number" placeholder="请输入积分转让数量" v-model="num">
          </div>
          <div class="list">
            <span>交易密码：</span>
            <input class="ipt iptcob" type="text" placeholder="请输入交易密码" v-model="password">
          </div>
<!--          <div class="list">-->
<!--            <span>本次交易码：</span>-->
<!--            <input class="ipt font_color" type="text" readonly="true" v-model="password">-->
<!--          </div>-->
        </div>
        <div class="text">
          <span class="co333">操作说明：</span>转让数量<span>1个积分起转,</span>每次转让扣除<span>5%</span>手续费。转让方发起转让，先扣除相对应积分到平台；接收方
          <span>60分钟内</span>未完成交易，交易自动取消,转出数量和手续费一起退回到转让方账户。
        </div>
        <div class="btn_boc">
          <div class="btn" @click="upData(0)">提交</div>
        </div>
      </div>
      <div v-if="index==1" class="box box1">
        <mt-loadmore style="height: 100%;" :top-method="loadTop" @top-status-change="handleTopChange":bottom-all-loaded="allLoaded" :autoFill="false" :bottom-method="loadBottom" ref="loadmore">
        <div v-if="none">
          <div class="het">
<!--            <mt-loadmore style="height: 100%;" :top-method="loadTop" @top-status-change="handleTopChange":bottom-all-loaded="allLoaded" :autoFill="false" :bottom-method="loadBottom" ref="loadmore">-->
              <div class="list_box pad010" v-for="(item,i) in list">
              <div class="list1 flex_bettwen">
                <div>转出方ID：{{item.sole_id}}</div>
                <div :class="[item.status=='wait'?'font_color':'cob3']">{{item.status| getItemStatus(item.status)}}</div>
              </div>
              <div class="list1">
                发起时间：2020-03-27  13:00
              </div>
              <div class="list1 flex_bettwen">
                <div>转出数量：<span class="font_color">{{item.score}}</span></div>
                <div class="operation" :class="[item.status=='wait'?'btnbg':'bgccc']" @click="operation(i,item.status)">操作</div>
              </div>
            </div>
<!--            </mt-loadmore>-->
          </div>
        </div>
        <div class="img_box" v-if="!none">
          <img src="../../assets/image/b2.png" alt="">
        </div>
        <div class="text">
          <span class="co333">操作说明：</span>转让数量<span>1个积分起转,</span>每次转让扣除<span>5%</span>手续费。转让方发起转让，先扣除相对应积分到平台；接收方
          <span>60分钟内</span>未完成交易，交易自动取消,转出数量和手续费一起退回到转让方账户。
        </div>
        </mt-loadmore>
      </div>
      <alert3 v-if="alertShow" :text="text" :state="state" :tishi="tishi" @getAlert="fromAlert"></alert3>
    </div>
</template>

<script>
    import alert3 from "../../components/alert/alert3"
    import { MessageBox } from 'mint-ui'
    export default {
      name: "transfer",
      components:{
        alert3,
        MessageBox
      },
      data(){
        return{
          index:0,
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
          trans_type:'rec',
          page:1,
          pagesize: 10,
          topStatus: '',
          states:true,
          allLoaded:false,
        }
      },
      mounted(){
        // console.log(this.$store.state.backs)
        // this.tishi = false
        // this.text = '请与推荐人或者代理中心交易，出现纠纷后果自负！'
        // this.state = 4
        // if (this.$store.state.backs != ''){
        //   this.index = 1
        //   this.alertShow = false
        // }else {
        //   this.alertShow = true
        // }
        this.getmain()
      },
      methods:{
        back(){
          this.$router.go(-1)
        },
        chose(index){
          this.index = index
        },
        upData(index){
          // this.text = '交易码正确，积分已到您账户余额'
          // this.state = true
          let that = this
          if (localStorage.getItem('is_real')==0){
              MessageBox.confirm('请完成实名认证').then(action => {
                that.$router.push('/mine/realname')
              });
          } else {
            this.$('user/starttrans', {sole_id: this.getId, score: this.num, trade_pwd: this.password}, res => {
              console.log(res)
              if (res.code === 200) {
                this.tishi = true
                this.text = res.data.trans_code
                this.state = 1
                this.alertShow = true
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
            this.$router.push('/mine/record')
          }
        },
        record(){//记录
          this.$router.push('/mine/record')
        },
        getmain(){//获取信息
          this.$('user/translog',{trans_type:this.trans_type,page:this.page,pagesize:this.pagesize},res=> {
            console.log(res)
            if (res.code === 200) {
              if (res.data.length<this.pagesize){
                this.states = false
                this.allLoaded = true
              }
              if (this.page ==1){
                this.list = res.data
              } else {
                this.list.push.apply(this.list,res.data)
                this.$refs.loadmore.onBottomLoaded();
              }
            }
          })
        },
        operation(i,status){//操作
          if (status == 'wait'){
            localStorage.setItem('receive', JSON.stringify(this.list[i]))
            this.$router.push('/mine/receive')
          } else {
            return false
          }
        },
        handleTopChange(status) {
          this.topStatus = status;
        },
        loadTop(){
          console.log(this.index)
          this.page = 1
          this.$('user/translog', {trans_type:this.trans_type,page:this.page,pagesize:this.pagesize}, res => {
            if (res.code === 200) {
              this.list = res.data
              this.states = true
              this.allLoaded = false
              this.$refs.loadmore.onTopLoaded();
            }
          })
        },
        loadBottom() {
          if (this.states) {
            this.page++
            this.getmain()
          }
          // this.allLoaded = true;// 若数据已全部获取完毕
        },

      },
      filters:{
        getItemStatus(key){
          var status = ''
          switch (key) {
            case 'wait':
              status = '进行中'
              break
            case 'fail':
              status = '已取消'
              break
            case 'success':
              status = '已完成'
              break
          }
          return status
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
  .classfys{
    z-index: 99;
    position: fixed;
    top: 45px;
    left: 0;
    width: 100%;
  }
  .zhanweis{
    height: 40px;
  }
  .box{
    padding: 10px;
  }
  /*.box1{*/
  /*  height: calc(100vh - 58px);*/
  /*  overflow-y: scroll;*/
  /*}*/
  .list_box{
    width: 355px;
    padding: 0 20px;
    background: #FFFFFF;
    border-radius: 6px;
    line-height: 50px;
    font-size: 14px;
    margin-bottom: 10px;
  }
  .pad010{
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .list{
    border-bottom: 1px solid #F5F5F5;
  }
  .list1{
    line-height: 30px;
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
  .img_box{
    width: 100%;
  }
  .operation{
    width: 70px;
    height: 25px;
    line-height: 25px;
    border-radius: 4px;
    color: #FFFFFF;
    text-align: center;
  }
  .het{
    /*height: calc(100vh - 85px);*/
    /*overflow-y: scroll;*/
  }
</style>
