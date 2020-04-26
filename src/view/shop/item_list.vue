<template>
    <div>
      <div class="header">
        <div class="search pr">
          <div class="head_img_l" @click="back"><i class="iconfont icon">&#xe601;</i></div>
          <div class="ipt">
            <input class="iconfont" type="text" :placeholder="icon" v-model="q">
            <div class="btns" @click="search">搜索</div>
          </div>
        </div>
      </div>
      <div class="zhanwei"></div>
      <div class="box">
        <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :autoFill="false" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
            <div>
                <shopList :list="list"></shopList>
            </div>
        </mt-loadmore>
      </div>
    </div>
</template>

<script>
    import shopList from "../../components/shopList"
    import { Indicator  } from 'mint-ui';
    export default {
      name: "item_list",
      components:{
        shopList,
        Indicator
      },
      data(){
        return{
          icon:'\ue638 搜索感兴趣的商品',
          type:'',
          q:'',
          cid:'',
          page:1,
          pagesize:10,
          list:[],
          state:true,
          topStatus: '',
          allLoaded:false,
        }
      },
      mounted(){
        if (this.$route.query.id){
          this.cid = this.$route.query.id
        }
        Indicator.open('加载中...');
        this.getList()
      },
      methods:{
        getList(){
          this.$('shop/list', {type:this.type,q:this.q,cid:this.cid,page:this.page,pagesize: this.pagesize}, res => {
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
              Indicator.close();
            }
          })
        },
        handleTopChange(status) {
          this.topStatus = status;
        },
        loadTop(){
          this.page = 1
          this.$('shop/list', {type:this.type,q:this.q,cid:this.cid,page:this.page,pagesize: this.pagesize}, res => {
            if (res.code === 200) {
              this.list = res.data
              this.$refs.loadmore.onTopLoaded();
            }
          })
        },
        loadBottom() {
          if (this.state) {
            this.page++
            this.getList()
          }
        },
        back(){
          this.$router.go(-1)
        },
        search(){
          Indicator.open('加载中...');
          this.$('shop/list', {type:this.type,q:this.q,cid:this.cid,page:this.page,pagesize: this.pagesize}, res => {
            console.log(res)
            if (res.code === 200) {
              if (res.data.length<this.pagesize){
                this.state = false
                this.allLoaded = true
              }
              this.list = res.data
              Indicator.close();
            }
          })
        }
      }
    }
</script>

<style scoped>
  .header{
    z-index: 9999;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: #ffffff;
  }
  .search{
    padding: 14px;
  }
  .head_img_l{
    position: absolute;
    left: 10px;
    width: 43px;
    height: 21px;
    margin-top: 4px;
  }
  .ipt{
    width: 280px;
    height: 30px;
    margin: auto;
    padding-right: 40px;
    line-height: 30px;
    color: #999999;
    border-radius: 30px;
    background: #F5F5F5;
  }
  .ipt input{
    width: 100%;
    height: 100%;
    text-align: center;
    font-size: 13px;
  }
  .ipt i{
    font-size: 13px;
  }
  .btns{
    position: absolute;
    top: 14px;
    right: 14px;
    width: 64px;
    line-height: 30px;
    border-radius: 30px;
    text-align: center;
    background: #F97E26;
    color: #FFFFFF;
    font-size: 13px;
  }

  .zhanwei{
    height: 58px;
  }
  .box{
    height: calc(100vh - 58px);
    overflow-y: scroll;
  }
</style>
