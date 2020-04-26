<template>
    <div>
      <div class="top_box">
        <div class="top">
          <div class="header">
            <i @click="back" class="iconfont icon">&#xe601;</i>
            <p>{{title}}</p>
            <i @click="dateChose" class="iconfont icons">&#xe68b;</i>
          </div>
<!--          <div class="zhanwei"></div>-->
          <div class="flex_bettwen inform">
            <div>
              <p>{{score}}</p>
              <p>积分余额</p>
            </div>
            <div>
              <p>{{all_score}}</p>
              <p>累计收益</p>
            </div>
          </div>
        </div>
        <div class="classfy flex_around">
          <div :class="{active:index==0}" @click="chose(0,'inc')">收入</div>
          <div :class="{active:index==1}" @click="chose(1,'dis')">支出</div>
        </div>
      </div>
      <div class="zhanwei"></div>
      <div class="list_box">
        <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :autoFill="false" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
          <div class="boxss">
            <div v-for="item in list" class="list clearfix">
              <div class="fl head" :class="{bg2:index==1}">{{item.op_class}}</div>
              <div class="fl form">
                <div class="name co999 texthidden"><span>{{item.detail_top}}</span>{{item.detail}}</div>
                <div class="time">{{item.createtime}}</div>
              </div>
              <div class="fr num">{{item.score}}</div>
            </div>
          </div>
          <div slot="top" class="mint-loadmore-top">
            <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
            <span v-show="topStatus === 'loading'">Loading...</span>
          </div>
        </mt-loadmore>
      </div>
      <div class="date_box">
        <mt-datetime-picker
          ref="picker"
          v-model="time"
          type="date"
          year-format="{value} 年"
          month-format="{value} 月"
          date-format="{value} 日"
          :startDate="startdate"
          :endDate="new Date()"
          @confirm="checkTime">
        </mt-datetime-picker>
      </div>
    </div>
</template>

<script>
    import headerBackt from "../../components/headerBackt"
    export default {
      name: "integral",
      components:{
        headerBackt
      },
      data(){
        return{
          title:'积分明细',
          index:0,
          list:[],
          time:'',
          startdate: new Date('2019-01-01'),
          date:'',
          score:0,
          all_score:0,
          type:'inc',
          page:1,
          pagesize: 10,
          topStatus: '',
          pageA:1,
          pageB:1,
          stateA:true,
          stateB:true,
          // loadA:false,
          // loadB:false,
          allLoaded:false,
          start:false,//初始
        }
      },
      mounted(){
        window.scrollTo(0, 0)
        this.score = this.$route.query.score
        this.all_score = this.$route.query.all_score
        this.getmain()
        // this.list = this.list1
      },
      methods:{
        getmain(){
          this.$('user/scorelog', {op_type:this.type,query_time:this.date,page:this.page,pagesize:this.pagesize}, res => {
            // console.log(res)
            if (res.code === 200) {
              this.start = true
              if (res.data.length<this.pagesize){
                if (this.index == 0){
                  this.stateA = false
                }else {
                  this.stateB =  false
                }
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
        back(){
          this.$router.go(-1)
        },
        chose(index,type){
          this.index = index
          this.type = type
          this.allLoaded = false
          if (index == 0 ) {
            this.page = this.pageA
          }else {
            this.page = this.pageB
          }
          this.getmain()
        },
        dateChose() {
          let a = document.getElementsByClassName('picker-slot')
          a[2].style.display = 'none'
          this.$refs.picker.open();
        },
        checkTime(data){
          var month = data.getMonth() + 1
          var thisTime = data.getFullYear() + '-' + month
          this.date = thisTime
          this.getmain()
        },
        handleTopChange(status) {
          this.topStatus = status;
        },
        loadTop(){
          console.log(this.index)
          this.page = 1
          this.$('user/scorelog', {op_type:this.type,query_time:this.date,page:this.page,pagesize:this.pagesize}, res => {
            if (res.code === 200) {
              this.list = res.data
              this.$refs.loadmore.onTopLoaded();
            }
          })
        },
        loadBottom() {
          if (this.start) {
            if (this.index == 0) {
              if (this.stateA) {
                this.pageA++
                this.page = this.pageA
              }
            } else {
              if (this.stateB) {
                this.pageB++
                this.page = this.pageB
              }
            }
            this.getmain()
            // this.allLoaded = true;// 若数据已全部获取完毕
          }
        }
      }
    }
</script>

<style scoped>
  .header{
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 15px;
  }
  .icon{
    position: absolute;
    left: 10px;
  }
  .icons{
    position: absolute;
    top: 0;
    right: 10px;
    font-size: 20px;
  }
  .zhanwei{
    /*height: 50px;*/
    /*height: 157px;*/
  }
  .header p{
    font-weight: bold;
  }
  .top_box{
    /*position: fixed;*/
    /*top: 0;*/
    /*left: 0;*/
    width: 100%;
    z-index: 999;
  }
  .top{
    background: linear-gradient(to right,#F7B132,#ED6E28);
    color: #FFFFFF;
    padding-bottom: 20px;
  }
  .inform>div{
    width: 50%;
    text-align: center;
  }
  .inform>div>p:first-child{
    font-size: 24px;
    line-height: 32px;
    font-weight: bold;
  }
  .inform>div>p:last-child{
    font-size: 12px;
    line-height: 16px;
  }
  .classfy{
    height: 40px;
    line-height: 40px;
    background: #FFFFFF;
    color: #666666;
  }
  .active{
    color: #FA7624;
    font-weight: bold;
    border-bottom: 2px solid #FA7624;
  }
  .list_box{
    height:calc(100vh - 157px);
    padding: 10px;
    overflow-y: scroll;
  }
  .boxss{
    min-height: calc(100vh - 157px);
  }
  .list{
    padding: 19px 32px 19px 11px;
    border-radius: 6px;
    background: #FFFFFF;
    margin-bottom: 10px;
  }
  .head{
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #FA7624;
    color: #FFFFFF;
    line-height: 36px;
    text-align: center;
    font-size: 12px;
    margin-right: 12px;
  }
  .bg2{
    background: #F7B132;
  }
  .name{
    width: 205px;
    line-height: 18px;
    margin-bottom: 6px;
  }
  .name span{
    color: #333;
  }
  .time{
    font-size: 12px;
    color: #B3B3B3;
    line-height: 12px;
  }
  .num{
    font-size: 18px;
    font-weight: bold;
    line-height: 36px;
  }
  .date_box>>>.mint-datetime-cancel{
    color: #999999!important;
  }
  .date_box>>>.mint-datetime-confirm{
    color: #FA7624!important;
  }
  /*.list_box>.mint-loadmore{*/
  /*  height: 100%;*/
  /*  overflow-y: scroll;*/
  /*}*/
</style>
