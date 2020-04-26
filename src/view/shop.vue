<template>
    <div>
      <div class="header">
        <div class="search">
          <div class="head_img_l"><img src="../assets/image/h1.png" alt=""></div>
          <div class="ipt" @click="openSearch"><i class="iconfont">&#xe638;</i> 搜索感兴趣的商品</div>
        </div>
        <div class="classfy_box pr">
          <div class="classfy_list" ref="classfyScroll">
            <div v-for="(item,i) in classfy" :class="{active:index_classfy === i}" class="classfy" @click="checkClassfy(i,item.id)">{{item.name}}</div>
          </div>
          <div v-if="hide" class="classfy_img" @click="openMore"><img src="../assets/image/i9.png" alt=""></div>
        </div>
      </div>
      <div class="zhanwei"></div>
      <div class="bbbx">
        <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :autoFill="false" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
          <div v-if="bannerShow">
            <banner :banner="banner"></banner>
          </div>
          <div v-if="hide">
            <div v-if="index_classfy==0" class="recond_box">
              <div v-for="(item,i) in recond" class="recond" @click="checkClassfy(i+1,item.id)">
                <div class="recond_img">
                  <img :src="item.pic" alt="">
                </div>
                <div>{{item.name}}</div>
              </div>
            </div>
            <div v-if="index_classfy!=0"  class="recond_box">
            <div v-for="item in recond" class="recond" @click="checkRecond(item.id)">
              <div class="recond_img">
                <img :src="item.pic" alt="">
              </div>
              <div>{{item.name}}</div>
            </div>
          </div>
          </div>
          <div class="box">
            <div class="tit">
              <img src="../assets/image/t1.png" alt="">
            </div>
            <div>
                <shopList :list="list"></shopList>
            </div>
          </div>
        </mt-loadmore>
      </div>
    </div>
</template>

<script>
    import banner from "../components/banner"
    import shopList from "../components/shopList"
    import { Indicator  } from 'mint-ui';
    export default {
      name: "shop",
      components:{
        banner,
        shopList,
        Indicator
      },
      data(){
        return{
          index_classfy:0,
          classfy:[{id:'',name:'热门'}],
          banner:[],
          recond:[],
          bannerShow:true,
          type:'hot',
          q:'',
          cid:'',
          page:1,
          pagesize:10,
          list:[],
          state:true,
          topStatus: '',
          allLoaded:false,
          hide:false
        }
      },
      mounted(){
        this.getClassfy()
        this.getRecond()
        window.scrollTo(0,0)
      },
      methods:{
        getClassfy(){
          this.$('shop/home', {}, res => {
            console.log(res)
            if (res.code === 200) {
              this.banner = res.data.banner
              this.classfy.push.apply(this.classfy,res.data.class_list)
            }
          })
        },
        getRecond(){
          Indicator.open('加载中...');
          this.$('shop/itemclass', {cid:this.cid}, res => {
            console.log(res)
            if (res.code === 200) {
              this.recond = res.data
              this.getList()
            }
          })
        },
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
        checkClassfy(index,id){
          this.cid = id
          this.page = 1
          this.allLoaded = false
          if (index==0){
            this.bannerShow = true
            this.type = 'hot'
          } else {
            this.bannerShow = false
            this.type = 'def'
          }
          this.index_classfy = index
          this.$refs.classfyScroll.scrollLeft = 67*index - 135
          this.getRecond()
        },
        checkRecond(id){
          this.page = 1
          Indicator.open('加载中...');
          this.cid = id
          this.allLoaded = false
          this.getList()
        },
        openMore(){
          this.$router.push('/shop/classfy')
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
        openSearch(){
          this.$router.push('/shop/item_list')
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
    display: flex;
    justify-content: space-between;
    padding: 14px;
  }
  .head_img_l{
    width: 43px;
    height: 21px;
    margin-top: 4px;
  }
  .ipt{
    width: 280px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 13px;
    color: #999999;
    border-radius: 30px;
    background: #F5F5F5;
  }
  .ipt i{
    font-size: 13px;
  }
  .classfy_box{
    overflow-y: hidden;
  }
  .classfy_list{
    width: 100%;
    height: 40px;
    overflow-x: auto;
    /*padding-right: 45px;*/
    white-space: nowrap;
    text-align: center;
    line-height: 37px;
  }
  .classfy_list::-webkit-scrollbar{
    display: none;
  }
  .classfy{
    position: relative;
    display: inline-block;
    width: 67px;
    font-size: 15px;
    color: #999999;
  }
  .active{
    color: #EF651B;
    font-size: 17px;
    font-weight: bold;
  }
  .more_active{
    color: #EF651B!important;
    font-weight: bold;
  }
  .active:after{
    position: absolute;
    bottom: -1px;
    left: 50%;
    transform: translateX(-50%);
    content: '';
    width: 20px;
    height: 4px;
    background: #EF651B;
  }
  .classfy_img{
    position: absolute;
    top: 0;
    right: 0;
    width: 45px;
    height: 40px;
    padding: 13px;
    background: #ffffff;
    box-shadow: -3px 5px 7px #999999;
  }
  .zhanwei{
    height: 98px;
  }

  .recond_box,.more_box{
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    text-align: center;
    padding: 3px;
    background: #FFFFFF;
  }
  .recond,.more{
    width: 20%;
    font-size: 12px;
    color: #4D4D4D;
    margin-bottom: 3px;
  }
  .recond_img,.more_img{
    width: 45px;
    height: 45px;
    margin: 5px auto;
    border-radius: 50%;
    overflow: hidden;
  }
  .tit{
    text-align: center;
    padding-top: 15px;
  }
  .tit img{
    width: 110px;
  }
  /*img{*/
  /*  width: 100%!important;*/
  /*  height: inherit;*/
  /*  !*padding-bottom: 70px;*!*/
  /*}*/
  .bbbx{
    height: calc(100vh - 148px);
    overflow-y: scroll;
  }
</style>
