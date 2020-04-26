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
<!--          <div class="tab" @click="openCreat">-->
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
    import { MessageBox } from 'mint-ui'
    export default {
      name: "index",
      components:{
        business,
        shop,
        release,
        trade,
        mine,
        MessageBox
      },
      data(){
          return{
            tabBarImgArr:[   //图片切换
              {normal: require('../assets/image/i10.png'), selected: require('../assets/image/i11.png')},
              {normal: require('../assets/image/i20.png'), selected: require('../assets/image/i21.png')},
              {normal: require('../assets/image/i31.png'), selected: require('../assets/image/i31.png')},
              {normal: require('../assets/image/i40.png'), selected: require('../assets/image/i41.png')},
              {normal: require('../assets/image/i50.png'), selected: require('../assets/image/i51.png')}
            ],
            code:'',
            info:'',
          }
      },
      created(){

      },
      mounted(){
        console.log(111)
        // let origin = window.location.origin
        let href = window.location.href;
        let search = href.split("?");
        if (search[1]){
          let pair = search[1].split("&");
          let code = pair[0].split("=");
          let codes = code[1];
          localStorage.setItem('codes',code)
          // alert(codes&&!localStorage.getItem('token')+',index')
          if (codes&&!localStorage.getItem('token')){
            this.code = codes
            this.$('user/wxlogin',{code:this.code},res=>{
              // console.log(res)
              // alert(res.msg+','+res.code)
              if (res.code === 200){
                localStorage.setItem('token',res.data.token)
                window.location.href=search[0]
              }
            })
          }
        }else {
          console.log(href,search)
        }
        this.getInfo()
      },
      methods:{
        switchTo(path){
          let that = this;
          // if (localStorage.getItem('is_real')==0){
          //   if (path === '/release'){
          //     MessageBox.confirm('请完成实名认证').then(action => {
          //     that.$router.push('/mine/realname')
          //     });
          //   } else {
          //     this.$router.replace(path)
          //   }
          // } else {
            this.$router.replace(path)
            if (path === '/release') {
              localStorage.setItem('go',0)
            }else {
              localStorage.setItem('url',this.$route.path)
            }
          // }
        },
        getInfo(){
          this.$('user/info', {}, res => {
            console.log(res)
            if (res.code === 200) {
              this.info = res.data
              localStorage.setItem('is_real',res.data.is_real)
              localStorage.setItem('rusername',res.data.rusername)
              localStorage.setItem('is_paypwd',res.data.is_paypwd)
              localStorage.setItem('score',res.data.score)
              localStorage.setItem('info', JSON.stringify(res.data))
            }
          })
        }
      }
    }
</script>

<style scoped>
  .foot{
    z-index: 998;
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
    box-shadow: 0px 0px 10px #dddddd;
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
    box-shadow: 0px -1px 1px #dddddd;
  }
  .release_tab img{
    width: 34px;
    height: 34px;
  }
  .zhanwei{
    height: 50px;
  }
</style>
