<template>
    <div>
      <div class="header">
        <div class="head_img_l"><img src="../assets/image/h1.png" alt=""></div>
        <p>商圈</p>
        <div class="head_img_r" @click="openAD"><img src="../assets/image/h2.png" alt=""></div>
      </div>
      <div class="zhanwei"></div>
      <banner :banner="banner" :type="type"></banner>
      <div class="work">今日广告浏览任务剩余：{{browse_num}}次</div>
      <div class="box">
        <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :autoFill="false" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
          <list :list="list"></list>
        </mt-loadmore>
      </div>
    </div>
</template>

<script>
    import list from "../components/list"
    import banner from "../components/banner"
    export default {
      name: "business",
      components:{
          list,
          banner,
      },
      data(){
          return{
            banner:[],
            browse_num:'',
            list:[],
            page:1,
            pagesize: 10,
            state:true,
            topStatus: '',
            allLoaded:false,
            type:'ad',
          }
      },
      // created(){
      //   // this.$('user/login',{},res=>{
      //   //   console.log(res)
      //   //   if (res.code === 200) {
      //   //     this.list = res.data
      //   //   }
      //   // })
      //   localStorage.setItem('token','6674aaac-08cf-3f5b-5d22-f8e858aa89f1')
      // },
      mounted(){
        if (localStorage.getItem("token")){
          this.getmain()
          this.getlist()
        }
      },
      methods:{
        openAD(){
          this.$router.push('/business/myad')
        },
        getmain(){
          this.$('advert/home', {}, res => {
            console.log(res)
            if (res.code === 200) {
              this.banner = res.data.banner
              this.browse_num = res.data.browse_num
            }else if (res.code === 401){
              localStorage.removeItem('token')
              window.location.href = window.location.href.split('#')[0]
              return false
            }
          })
          this.$('score/buyinfo', {}, res => {
            console.log(res)
            if (res.code === 200) {
              localStorage.setItem("flag",res.data.flag)
            }
          })
        },
        getlist(){
          this.$('advert/list', {page:this.page,pagesize:this.pagesize}, res => {
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
        handleTopChange(status) {
          this.topStatus = status;
        },
        loadTop(){
          this.page = 1
          this.$('advert/list', {page:this.page,pagesize:this.pagesize}, res => {
            if (res.code === 200) {
              this.list = res.data
              this.$refs.loadmore.onTopLoaded();
            }
          })
        },
        loadBottom() {
          if (!this.state) {
            setTimeout(()=>{
              this.$refs.loadmore.onBottomLoaded();
            },1000)
            return false
          }
          this.page++
          this.getlist()
        }
      }
    }
</script>

<style scoped>
  .header{
    z-index: 99999;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 45px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    line-height: 45px;
    background: #ffffff;
  }
  .header div{
    position: absolute;
    top: 4px;
    height: 21px;
  }
  .head_img_l{
    width: 43px;
    left: 10px;
  }
  .head_img_r{
    width: 20px;
    right: 15px;
  }
  .zhanwei{
    width: 100%;
    height: 45px;
  }
  .work{
    height: 30px;
    line-height: 30px;
    color: #FB7939;
    text-align: center;
    background: #ffffff;
  }
  .box{
    height: calc(100vh - 225px);
    overflow: scroll;
    padding-bottom: 50px;
  }

</style>
