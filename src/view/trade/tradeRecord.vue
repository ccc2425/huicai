<template>
  <div>
    <headerBack :title="title"></headerBack>
    <div class="classfy flex_around">
      <div :class="{actives:index == 0}" @click="chose(0,'slr')">卖出已完成</div>
      <div :class="{actives:index == 1}" @click="chose(1,'buy')">买入已完成</div>
    </div>
    <div class="box">
      <mt-loadmore :autoFill="false" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <div class="list" v-for="item in list">
          <div class="co999 state">{{item.createtime}} <span>{{item.order_msg}}</span></div>
          <div class="flex_bettwen">
            <span>卖出数量：{{item.score}}</span>
            <span class="font_color bold">+￥{{item.balance}}</span>
          </div>
        </div>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
    import headerBack from "../../components/headerBack"
    import { Toast } from 'mint-ui'
    export default {
      name: "tradeRecord",
      components:{
        headerBack,
        Toast
      },
      data(){
        return{
          title:'交易明细',
          index:0,
          list:[0],
          type:'slr',
          page:1,
          pagesize: 10,
          state:true,
          allLoaded:false,
        }
      },
      mounted(){
        this.getmain()
      },
      methods:{
        chose(i,type){
          this.index = i
          this.page = 1
          this.type = type
          this.getmain()
        },
        getmain(){
          this.$('score/log', {type:this.type,page:this.page,pagesize:this.pagesize}, res => {
            console.log(res)
            if (res.code === 200) {
              if (res.data.length<this.pagesize){
                this.state = false
                this.allLoaded = true
              }
              if (this.page ==1){
                this.list = res.data
                console.log(this.list)
              } else {
                this.list.push.apply(this.list,res.data)
                this.$refs.loadmore.onBottomLoaded();
              }
            }
          })
        },
        // openDetail(){
        //   this.$router.push('/trade/myOrderDetail')
        // },
        loadBottom() {
          if (this.state) {
            this.page++
            this.getmain()
          }else {
            Toast({
              message: '到底了已经',
              position: 'middle',
              duration: 1000
            });
          }
        }
      }
    }
</script>

<style scoped>
  .classfy{
    padding: 0 25px;
    line-height: 45px;
    text-align: center;
    color: #999999;
    background: #FFFFFF;
  }
  .actives{
    position: relative;
  }
  .actives:after{
    bottom: 5px;
  }
  .box{
    padding: 10px;
  }
  .list{
    width: 355px;
    padding: 15px;
    margin-bottom: 8px;
    background: #FFFFFF;
    border-radius: 6px;
  }
  .state{
    font-size: 12px;
    margin-bottom: 16px;
  }
  .state span{
    color: #676767;
  }
</style>
