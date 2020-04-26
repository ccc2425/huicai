<template>
    <div>
      <div class="head">交易</div>
      <div class="zhanwei"></div>
      <div v-if="hide == 0">
        <div class="img_box">
          <img src="../assets/image/b1.png" alt="">
        </div>
        <div class="box">
          <p class="text">如需转让HC请添加<span class="font_color">代理交易中心</span>微信</p>
          <div class="wx"><img src="../assets/image/wx.png" alt=""> {{id}}</div>
          <div class="copy" :data-clipboard-text="id" @click="copy">复制</div>
        </div>
      </div>
      <div v-if="hide == 1">
        <div class="out">
<!--          <mt-loadmore :autoFill="false" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">-->
            <div class="today_price_box">
              <p class="today_price">{{rate_now}}</p>
              <p>今日价格(元)</p>
            </div>
            <div class="bgcf">
              <div class="flex_around recond">
                <div class="pr" :class="{actives:index ==0}" @click="chose(0,'day')">日线</div>
                <div class="pr" :class="{actives:index ==1}" @click="chose(1,'hour')">分时线</div>
              </div>
              <div class="echart_box">
                <div id="charts1" class="echart"></div>
              </div>
            </div>
            <div class="classfy flex_around">
              <div @click="openNewWin('purchase',rate_now)">
                <div class="classfy_img">
                  <img src="../assets/image/l5.png" alt="">
                </div>
                发布求购
              </div>
              <div @click="openNewWin('myOrder')">
                <div class="classfy_img">
                  <img src="../assets/image/l6.png" alt="">
                </div>
                我的订单
              </div>
              <div @click="openNewWin('tradeRecord')">
                <div class="classfy_img">
                  <img src="../assets/image/l7.png" alt="">
                </div>
                交易记录
              </div>
            </div>
            <div class="hall_tit">
              <div class="tit"><i class="iconfont">&#xe637;</i>求购大厅</div>
              <div class="ipt_box pr">
                <input class="ipt" type="number" placeholder="请输入手机号码" v-model="mobile">
                <input class="ipt_btn" type="button" value="搜索" @click="search">
              </div>
            </div>
          <mt-loadmore :autoFill="false" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
            <div class="list_box">
              <div class="list pr" v-for="item in list">
                <div class="list_img">
                  <img :src="item.avatar" alt="">
                </div>
                <div class="list_text">
                  <div class="tel">{{item.mobile}}</div>
                  <div class="info">数量：<span class="num">{{item.score}}</span>总价：￥{{item.balance}}</div>
                </div>
                <div class="sell" @click="sell(item.order_id)">卖出</div>
              </div>
            </div>
          </mt-loadmore>
        </div>
      </div>
      <alert6 v-if="alertShow" :info="info" @getAlert="fromAlert" @getAlertClose="close"></alert6>
    </div>
</template>

<script>
    import Clipboard from 'clipboard'
    import { Toast  } from 'mint-ui';
    import alert6 from '../components/alert/alert6'
    export default {
      name: "trade",
      components:{
        Toast,
        alert6
      },
      data(){
          return{
            id:'',
            index:0,
            hide:localStorage.getItem("flag"),
            list:[],
            alertShow:false,
            time:[],
            datas:[],
            type:'day',
            rate_now:'0.0',
            page:1,
            pagesize:10,
            mobile:'',
            state:true,
            allLoaded:false,
            info:'',
            order_id:'',
          }
      },
      mounted(){
        this.getmain()
        this.getChar()
        this.getlist()
      },
      methods:{
        getmain(){
          this.$('advert/trade',{},res=>{
            if (res.code === 200){
              this.id = res.data.wx
            }
          })
        },
        getChar(){
          this.$('score/ratetrend',{type:this.type},res=>{
            console.log(res)
            if (res.code === 200){
              this.time = res.data.time
              this.datas = res.data.rate
              this.rate_now = res.data.rate_now
              this.$chart.line1('charts1',this.time,this.datas);
            }
          })
        },
        getlist(){
          this.$('score/list',{q:this.mobile,page:this.page,pagesize: this.pagesize},res=>{
            console.log(res)
            if (res.code === 200){
              if (res.data.length<this.pagesize){
                this.state = false
                this.allLoaded = true
              }
              if (this.page == 1){
                this.list = res.data
              } else {
                this.list.push.apply(this.list,res.data)
                this.$refs.loadmore.onBottomLoaded();
              }
            }
          })
        },
        chose(index,type){
          this.index = index
          this.type = type
          this.getChar()
        },
        search(){
          this.page = 1
          this.getlist()
        },
        fromAlert(data){//确定
          console.log(data)
          this.$('score/sall',{order_id:this.order_id,trade_pwd:data},res=>{
            console.log(res)
            if (res.code === 200){
              this.alertShow = false
              Toast({
                message: res.msg,
                position: 'middle',
                duration: 1000
              });
              setTimeout(()=>{
                this.$router.push('/trade/tradeDetail')
              },1000)
            }else {
              Toast({
                message: res.msg,
                position: 'middle',
                duration: 1000
              });
            }
          })
        },
        close(){
          this.alertShow = false
        },
        sell(id){//卖出
          this.$('score/sallinfo',{order_id:id},res=>{
            console.log(res)
            if (res.code === 200){
              this.info = res.data
              this.order_id = id
              this.alertShow = true
            }else {
              Toast({
                message: res.msg,
                position: 'middle',
                duration: 1000
              });
            }
          })
        },
        openNewWin(url,rate_now){
          this.$router.push('/trade/'+url + '?rate_now='+rate_now)
        },
        scrollBan(e){//禁止滑动
          e.preventDefault()
        },
        loadBottom() {
          if (this.state) {
            this.page++
            this.getlist()
          }
        },

        copy(){
          var clipboard = new Clipboard('.copy')
          clipboard.on('success', e => {
            Toast({
              message: '复制成功'
            })
            //释放内存
            clipboard.destroy()
          })
          clipboard.on('error', e => {
            // 不支持复制
            Toast({
              message: '手机权限不支持复制功能'
            })
            // 释放内存
            clipboard.destroy()
          })
        }
      },
      watch: { // 监听data中弹层状态
        alertShow (val) {
          if (val) {
            document.body.style.overflow = 'hidden'
            document.addEventListener('touchmove', this.scrollBan, {passive: false}) // 禁止页面滑动
          } else {
            document.body.style.overflow = '' // 出现滚动条
            document.removeEventListener('touchmove', this.scrollBan, {passive: false})
          }
        }
      }
    }
</script>

<style scoped>
  .head{
    z-index: 9;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    color: #FFFFFF;
    font-size: 17px;
    text-align: center;
    font-weight: bold;
    background: linear-gradient(to right,#EDAE38,#ED6E28);
  }
  .zhanwei{
    width: 100%;
    height: 50px;
  }
  .out{
    height: calc(100vh - 50px);
    overflow-y: scroll;
  }
  .today_price_box{
    padding: 18px 0;
    text-align: center;
    background: linear-gradient(to right,#EDAE38,#ED6E28);
    color: #FFFFFF;
    font-size: 12px;
  }
  .today_price{
    font-size: 30px;
    line-height: 48px;
    font-weight: bold;
    font-family: DIN Alternate Bold;
  }
  .recond{
    padding: 0 72px;
    line-height: 40px;
  }
  .echart_box{
    padding: 10px 0;
  }
  .echart{
    width: 354px;
    height: 232px;
    margin: auto;
  }
  .classfy{
    padding: 12px 0;
    text-align: center;
    line-height: 18px;
    font-size: 12px;
    background: #FFFFFF;
    margin-bottom: 10px;
  }
  .classfy_img{
    width: 45px;
    height: 45px;
    margin: 2px auto;
  }
  .hall_tit{
    z-index: 9;
    position: sticky;
    top: 0px;
    padding: 10px;
    background: #FFFFFF;
  }
  .tit{
    font-weight: bold;
    line-height: 21px;
    margin-bottom: 12px;
  }
  .tit i{
    margin-right: 4px;
  }
  .ipt_box{
    border-radius: 4px;
    overflow: hidden;
  }
  .ipt{
    width: 345px;
    padding: 0 96px 0 16px;
    height: 40px;
    line-height: 40px;
    background: #F5F5F5;
  }
  .ipt_btn{
    position: absolute;
    top: 0;
    right: 0;
    width: 80px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #FFFFFF;
    background: linear-gradient(to right,#FDAE4A,#FA7624);
  }
  .list_box{
    padding: 6px 18px 56px;
    background: #FFFFFF;
  }
  .list{
    display: flex;
    justify-content: flex-start;
    margin-bottom: 32px;
  }
  .list:last-child{
    margin-bottom: 10px;
  }
  .list_img{
    width: 55px;
    height: 55px;
    margin-right: 10px;
  }
  .list_text{
    width: 210px;
  }
  .tel{
    font-weight: bold;
    line-height: 30px;
  }
  .info{
    line-height: 25px;
    font-size: 13px;
    color: #666666;
  }
  .info span{
    color: #FA7E26;
    margin-right: 15px;
  }
  .sell{
    width: 60px;
    height: 30px;
    margin-top: 11px;
    line-height: 30px;
    border-radius: 4px;
    border: 1px solid #FA6F23;
    text-align: center;
    color: #FB802B;
  }



  .img_box{
    width: 300px;
    margin: 50px auto;
  }
  .box{
    width: 335px;
    margin: auto;
    padding: 20px;
    text-align: center;
    border-radius: 6px;
    border: 1px dashed #CCCCCC;
    color: #666666;
  }
  .text{
    font-size: 13px;
    line-height: 20px;
  }
  .wx{
    line-height: 45px;
    font-size: 20px;
    font-weight: bold;
  }
  .wx img{
    width: 21px;
    height: 17px;
  }
  .copy{
    width: 200px;
    height: 30px;
    background: linear-gradient(to right,#F7AE32,#FA7624);
    color: #FFFFFF;
    line-height: 30px;
    border-radius: 6px;
    margin: auto;
    font-size: 14px;
  }
</style>
