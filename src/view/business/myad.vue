<template>
    <div>
      <div class="top">
        <div class="header">
          <i @click="back" class="iconfont icon_l">&#xe601;</i>
          <p>我的广告</p>
          <i @click="createad" class="iconfont icon_r">&#xe676;</i>
        </div>
        <tip :num="num"></tip>
        <div class="classfy">
          <div :class="{active:index===0}" class="pr" @click="chosethis(0,'put')">投放中</div>
          <div :class="{active:index===1}" class="pr" @click="chosethis(1,'end')">已过期</div>
        </div>
      </div>
      <div class="zhanwei"></div>
      <div style="overflow-y: scroll">
        <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :autoFill="false" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded"  ref="loadmore">
          <adlist :list="list" :state="state"></adlist>
        </mt-loadmore>
      </div>
    </div>
</template>

<script>
    import adlist from "../../components/adlist"
    import tip from "../../components/tip"
    import { MessageBox } from 'mint-ui'
    export default {
      name: "myad",
      components:{
        adlist,
        tip,
        MessageBox
      },
      data(){
        return{
          index:0,
          state:true,
          list:[],
          type:'put',
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
          num:'',
        }
      },
      mounted(){
        this.getmain()
      },
      methods:{
        back(){
          this.$router.go(-1)
        },
        chosethis(index,type){
          this.index = index
          this.type = type
          this.allLoaded = false
          window.scrollTo(0, 0)
          if (index === 0){
            this.state = true
            this.page = this.pageA
          } else {
            this.state = false
            this.page = this.pageB
          }
          this.getmain()
        },
        createad(){
          // if (localStorage.getItem('is_real')==0){
          //     MessageBox.confirm('请完成实名认证').then(action => {
          //       that.$router.push('/mine/realname')
          //     });
          // }else {
            this.$router.push('/business/createad')
          // }
        },
        getmain(){
          this.$('advert/mylist', {type:this.type,page:this.page,pagesize:this.pagesize}, res => {
            console.log(res)
            if (res.code === 200) {
              if (res.data.list.length<this.pagesize){
                this.allLoaded = true
                if (this.index == 0){
                  this.stateA = false
                }else {
                  this.stateB =  false
                }
              }
              this.num = res.data.put_advert_num
              if (this.page ==1){
                this.list = res.data.list
              } else {
                this.list.push.apply(this.list,res.data.list)
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
          this.$('advert/mylist', {type:this.type,page:this.page,pagesize:this.pagesize}, res => {
            if (res.code === 200) {
              this.list = res.data.list
              this.num = res.data.put_advert_num
              this.$refs.loadmore.onTopLoaded();
            }
          })
        },
        loadBottom() {
            if (this.index == 0) {
              if (this.stateA) {
                this.pageB++
                this.page = this.pageB
              }
            } else {
              if (this.stateB) {
                this.pageB++
                this.page = this.pageB
              }
            }
            this.getmain()
        }
      }
    }
</script>

<style scoped>
  .top{
    z-index: 999;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
  .header{
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 15px;
    color: #333333;
    font-weight: bold;
    background: #ffffff;
  }
  .header .iconfont{
    position: absolute;
    top: 0;
    font-size: 20px;
    font-weight: normal;
  }
  .icon_l{
    left: 10px;
  }
  .icon_r{
    right: 16px;
  }
  .zhanwei{
    height: 115px;
  }

  .classfy{
    display: flex;
    justify-content: space-around;
    height: 50px;
    line-height: 50px;
    color: #999999;
    font-size: 15px;
    text-align: center;
    background: #ffffff;
  }
  .active{
    color: #FB7939;
    font-weight: bold;
  }
  .active:after{
    position: absolute;
    bottom: 3px;
    left: 50%;
    transform: translateX(-50%);
    content: '';
    width: 20px;
    height: 3px;
    background: #EF651B;
    border-radius: 3px;
  }
</style>
