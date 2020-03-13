<template>
    <div>
      <div class="header">
        <div class="search">
          <div class="head_img_l"><img src="../assets/image/h1.png" alt=""></div>
          <div class="ipt"><i class="iconfont">&#xe638;</i> 搜索感兴趣的商品</div>
        </div>
        <div class="classfy_box pr">
          <div class="classfy_list" ref="classfyScroll">
            <div v-for="(item,i) in classfy" :class="{active:index_classfy === i}" class="classfy" @click="checkClassfy(i)">{{item}}</div>
          </div>
          <div class="classfy_img" @click="openMore"><img src="../assets/image/i9.png" alt=""></div>
        </div>
<!--        <div v-if="moreShow" class="more_box">-->
<!--          <div v-for="(item,i) in more" class="more" :class="{more_active:index_classfy === i}" @click="checkClassfy(i)">-->
<!--            <div class="more_img">-->
<!--              <img :src="item.img" alt="">-->
<!--            </div>-->
<!--            <div>{{item.text}}</div>-->
<!--          </div>-->
<!--        </div>-->
      </div>
      <div class="zhanwei"></div>
      <banner></banner>
      <div class="recond_box">
        <div v-for="item in recond" class="recond">
          <div class="recond_img">
            <img :src="item.img" alt="">
          </div>
          <div>{{item.text}}</div>
        </div>
      </div>
      <div class="box">
        <div class="tit">
          <img src="../assets/image/t1.png" alt="">
        </div>
        <div>
          <shopList></shopList>
        </div>
      </div>
    </div>
</template>

<script>
    import banner from "../components/banner"
    import shopList from "../components/shopList"
    export default {
      name: "shop",
      components:{
        banner,
        shopList
      },
      data(){
        return{
          index_classfy:0,
          classfy:['热门','数码','美妆','女装','男装','洗护','童装','生活','母婴','用品','食品','家用'],
          // more:[
          //   {img:require('../assets/image/ban.png'),text:'热门'},
          //   {img:require('../assets/image/ban.png'),text:'数码'},
          //   {img:require('../assets/image/ban.png'),text:'美妆'},
          //   {img:require('../assets/image/ban.png'),text:'女装'},
          //   {img:require('../assets/image/ban.png'),text:'男装'},
          //   {img:require('../assets/image/ban.png'),text:'洗护'},
          //   {img:require('../assets/image/ban.png'),text:'童装'},
          //   {img:require('../assets/image/ban.png'),text:'生活'},
          //   {img:require('../assets/image/ban.png'),text:'母婴'},
          //   {img:require('../assets/image/ban.png'),text:'用品'},
          //   {img:require('../assets/image/ban.png'),text:'食品'},
          //   {img:require('../assets/image/ban.png'),text:'家用'}
          // ],
          // moreShow:false,
          recond:[
            {img:require('../assets/image/ban.png'),text:'连衣裙'},
            {img:require('../assets/image/ban.png'),text:'卫衣'},
            {img:require('../assets/image/ban.png'),text:'外套'},
            {img:require('../assets/image/ban.png'),text:'针织毛衣'},
            {img:require('../assets/image/ban.png'),text:'牛仔裤'},
            {img:require('../assets/image/ban.png'),text:'风衣'},
            {img:require('../assets/image/ban.png'),text:'衬衣'},
            {img:require('../assets/image/ban.png'),text:'T恤'},
            {img:require('../assets/image/ban.png'),text:'时尚套装'},
            {img:require('../assets/image/ban.png'),text:'更多'}
          ]
        }
      },
      methods:{
        checkClassfy(index){
          this.index_classfy = index
          this.$refs.classfyScroll.scrollLeft = 67*index - 135
          this.moreShow = false
        },
        openMore(){
          this.$router.push('/shop/classfy')
          // this.moreShow = !this.moreShow
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
    padding-right: 45px;
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
  .box{
    padding-bottom: 70px;
  }
</style>
