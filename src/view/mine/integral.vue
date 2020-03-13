<template>
    <div>
      <div class="top_box">
        <div class="top">
          <headerBackt :title="title"></headerBackt>
          <div class="flex_bettwen inform">
            <div>
              <p>3562</p>
              <p>积分余额</p>
            </div>
            <div>
              <p>4658</p>
              <p>累计收益</p>
            </div>
          </div>
        </div>
        <div class="classfy flex_around">
          <div :class="{active:index==0}" @click="chose(0)">收入</div>
          <div :class="{active:index==1}" @click="chose(1)">支出</div>
        </div>
      </div>
      <div class="list_box">
        <div v-for="item in list" class="list clearfix">
          <div class="fl head" :class="{bg2:index==1}">{{item.name}}</div>
          <div class="fl form">
            <div class="name">{{item.state}}</div>
            <div class="time">{{item.time}}</div>
          </div>
          <div class="fr num">{{item.money}}</div>
        </div>
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
          list1:[
            {name:'广告',state:'广告收益',time:'2020-03-04 16:35',money:'+16'},
            {name:'广告',state:'广告收益',time:'2020-03-04 16:35',money:'+16'},
            {name:'广告',state:'转让收益',time:'2020-03-04 16:35',money:'+32'},
            {name:'广告',state:'广告收益',time:'2020-03-04 16:35',money:'+16'},
          ],
          list2:[
            {name:'广告',state:'广告发布',time:'2020-03-04 16:35',money:'-10'},
            {name:'广告',state:'广告竞价',time:'2020-03-04 16:35',money:'-1000'},
            {name:'购物',state:'购物支出',time:'2020-03-04 16:35',money:'-109'},
            {name:'购物',state:'购物支出',time:'2020-03-04 16:35',money:'-16'},
          ]
        }
      },
      mounted(){
        this.list = this.list1
      },
      methods:{
        chose(index){
          this.index = index
          if (index == 0 ) {
            this.list = this.list1
          }else {
            this.list = this.list2
          }
        }
      }
    }
</script>

<style scoped>
  .top_box{
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
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
    padding: 10px;
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
    line-height: 18px;
    margin-bottom: 6px;
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
</style>
