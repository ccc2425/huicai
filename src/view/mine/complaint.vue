<template>
    <div>
      <headerBack :title="title"></headerBack>
      <div class="box" ref="box">
        <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :autoFill="false" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
          <div ref="box1">
            <div v-for="(item,i) in list" class="list">
              <div class="text mb15">
                留言：{{item.content}}
              </div>
              <div class="img_box mb15">
                <img v-for="items in item.imgs" :src="items" alt="">
              </div>
              <div class="time mb15">{{item.createtime}}</div>
              <div v-if="item.status == 1" class="reply">客服：{{item.reply}}</div>
            </div>
          </div>
        </mt-loadmore>
      </div>
      <div class="btn_box">
        <div class="btn" @click="proposal()">我要建议</div>
      </div>
    </div>
</template>

<script>
    import headerBack from "../../components/headerBack"
    export default {
      name: "complaint",
      components:{
        headerBack,
      },
      data(){
        return{
          title:'投诉建议',
          list:[],
          page:1,
          pagesize: 10,
          state:true,
          topStatus: '',
          allLoaded:false,
        }
      },
      mounted(){
        // window.scrollTo(0,0)
        // console.log(this.$refs.box1)
        this.getmain()
      },
      methods:{
        proposal(){
          this.$router.push('/mine/proposal')
        },
        getmain(){
          this.$('user/feedbacklist', {page:this.page,pagesize:this.pagesize}, res => {
            console.log(res)
            if (res.code === 200) {
              if (res.data.length<this.pagesize){
                  this.state = false
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
        handleTopChange(status) {
          this.topStatus = status;
        },
        loadTop(){
          this.page = 1
          this.$('user/feedbacklist', {page:this.page,pagesize:this.pagesize}, res => {
            if (res.code === 200) {
              this.list = res.data
              this.$refs.loadmore.onTopLoaded();
            }
          })
        },
        loadBottom() {
          if (this.state) {
            this.page++
            this.getmain()
          }
        }
      }
    }
</script>

<style scoped>
  .box{
    padding: 10px;
    color: #999999;
    height: calc(100vh - 100px);
    overflow: scroll;
  }
  .list{
    width: 100%;
    padding: 15px 10px;
    border-radius: 6px;
    background: #FFFFFF;
    margin-bottom: 10px;
  }
  .text{
    color: #4D4D4D;
    line-height: 24px;
  }
  .img_box img{
    width: 90px;
    height: 90px;
    margin-right: 10px;
    border-radius: 6px;
  }
  .time{
    font-size: 12px;
  }
  .reply{
    padding: 10px 4px 0px;
    line-height: 21px;
    border-top: 1px solid #E6E6E6;
  }
  .btn_box{
    position: fixed;
    bottom: 0px;
    left: 0;
    width: 100%;
    padding-bottom: 10px;
    background: #F5F5F5;
  }
  .btn{
    width: 355px;
  }
  .list>div:last-child{
    margin-bottom: 0!important;
  }
</style>
