<template>
    <div>
      <div class="content">
          <router-view></router-view>
      </div>
<!--      <div class="zhanwei"></div>-->
      <div class="foot">
        <div class="foot_box">
          <div class="tab" @click="switchTo('/business')">
            <div>
              <img :src="'/business' === $route.path ? tabBarImgArr[0].selected : tabBarImgArr[0].normal" alt="商圈">
            </div>
            <span :class="{on: '/business' === $route.path}">商圈</span>
          </div>
          <div class="tab" @click="switchTo('/shop')">
            <div>
              <img :src="'/shop' === $route.path ? tabBarImgArr[1].selected : tabBarImgArr[1].normal" alt="商城">
            </div>
            <span :class="{on: '/shop' === $route.path}">商城</span>
          </div>
          <div class="tab" @click="switchTo('/release')">
            <div class="release_tab">
              <img :src="'/release' === $route.path ? tabBarImgArr[2].selected : tabBarImgArr[2].normal" alt="发布">
            </div>
            <div class="release_none">
              <img :src="'/release' === $route.path ? tabBarImgArr[2].selected : tabBarImgArr[2].normal" alt="发布">
            </div>
            <span :class="{on: '/release' === $route.path}">发布</span>
          </div>
          <div class="tab" @click="switchTo('/trade')">
            <div>
              <img :src="'/trade' === $route.path ? tabBarImgArr[3].selected : tabBarImgArr[3].normal" alt="交易">
            </div>
            <span :class="{on: '/trade' === $route.path}">交易</span>
          </div>
          <div class="tab" @click="switchTo('/mine')">
            <div>
              <img :src="'/mine' === $route.path ? tabBarImgArr[4].selected : tabBarImgArr[4].normal" alt="我的">
            </div>
            <span :class="{on: '/mine' === $route.path}">我的</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import business from './business'
    import shop from './shop'
    import release from './release'
    import trade from './trade'
    import mine from './mine'
    export default {
      name: "index",
      components:{
        business,
        shop,
        release,
        trade,
        mine,

      },
      data(){
          return{
            tabBarImgArr:[   //图片切换
              {normal: require('../assets/image/i10.png'), selected: require('../assets/image/i11.png')},
              {normal: require('../assets/image/i20.png'), selected: require('../assets/image/i21.png')},
              {normal: require('../assets/image/i31.png'), selected: require('../assets/image/i31.png')},
              {normal: require('../assets/image/i20.png'), selected: require('../assets/image/i41.png')},
              {normal: require('../assets/image/i10.png'), selected: require('../assets/image/i51.png')}
            ]
          }
      },
      mounted(){
        // this.login()
      },
      methods:{
        switchTo(path){
          // console.log(this.$router)
          this.$router.replace(path)
        },
        login(){
          // window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7bd41abdbcec83f9&redirect_uri=REDIRECT_URI&response_type=code&scope=snsapi_userinfo#wechat_redirect"
          // this.$('wxlogin', {code:''}, res => {
          //   console.log(res.data)
          // })
        }
      }
    }
</script>

<style scoped>
  .foot{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background: #ffffff;
  }
  .foot_box{
    display: flex;
    justify-content: space-between;
    text-align: center;
    height: 100%;
    box-shadow: 1px 1px 1px #aaaaaa;
  }
  .tab{
    width: 20%;
    height: 100%;
  }
  .tab img{
    width: 22px;
    height: 22px;
    margin: 5px auto 0;
  }
  /*.release_none{*/
  /*  width: 34px;*/
  /*  height: 34px;*/
  /*  margin: auto;*/
  /*}*/
  /*.release_none img{*/
  /*  width: 100%;*/
  /*  height: 100%;*/
  /*  margin-top: 0px;*/
  /*}*/
  .on{
    color: #F97E26;
  }
  .release_tab{
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    /*padding: 7px;*/
    width: 48px;
    height: 41px;
    border-radius: 50%;
    background: #ffffff;
  }
  .release_tab img{
    width: 34px;
    height: 34px;
  }
  .zhanwei{
    height: 50px;
  }
</style>
