<template>
    <div>
      <div class="top_box">
        <div class="top">
          <headerBack :title="title"></headerBack>
          <div class="tip">
            <i class="iconfont">&#xe608;</i> 我的推荐人：{{rusername}}
          </div>
          <div class="flex_bettwen inform pr">
            <div>
              <p>{{all_sub_num}}</p>
              <p>团队总人数</p>
            </div>
            <div>
              <p>{{a_sub_num}}</p>
              <p>直推总人数</p>
            </div>
            <div class="border_right"></div>
          </div>
        </div>
        <div class="classfys flex_around">
          <div class="pr" :class="{actives:index==0}" @click="chose(0,'all')">团队成员</div>
          <div class="pr" :class="{actives:index==1}" @click="chose(1,'a')">直推成员</div>
        </div>
      </div>
      <div class="box">
        <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :autoFill="false" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
          <div class="bbox">
            <div v-for="item in list" class="list">
            <div class="head_icon">
              <img :src="item.avatar" alt="">
            </div>
            <div>
              <div class="name">{{item.username}}</div>
              <div class="form_box">
                <div class="time">注册时间：{{item.createtime}}</div>
                <div v-if="index===0" class="getname">推荐人：{{item.rusername}}</div>
              </div>
            </div>
          </div>
          </div>
        </mt-loadmore>
      </div>
    </div>
</template>

<script>
    import headerBack from "../../components/headerBack"
    export default {
      name: "myteam",
      components:{
        headerBack
      },
      data(){
        return{
          title:'我的团队',
          index:0,
          list:[],
          sub_type:'all',
          page:1,
          pagesize: 10,
          topStatus: '',
          a_sub_num:0,
          all_sub_num:0,
          pageA:1,
          pageB:1,
          stateA:true,
          stateB:true,
          // loadA:false,
          // loadB:false,
          allLoaded:false,
          start:false,//初始
          rusername:localStorage.getItem('rusername'),
        }
      },
      mounted(){
        window.scrollTo(0, 0)
        this.a_sub_num = this.$route.query.a_sub_num
        this.all_sub_num = this.$route.query.all_sub_num
        this.getmain()
      },
      methods:{
        getmain(){
          this.$('user/team', {sub_type:this.sub_type,page:this.page,pagesize:this.pagesize}, res => {
            // console.log(res)
            if (res.code === 200) {
              this.start = true
              if (res.data.length<this.pagesize){
                if (this.index == 0){
                  this.stateA = false
                  this.allLoaded = true
                }else {
                  this.stateB =  false
                  this.allLoaded = true
                }
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
        chose(index,type){
          this.index = index
          this.sub_type = type
          this.allLoaded = false
          if (index == 0 ) {
            this.page = this.pageA
          }else {
            this.page = this.pageB
          }
          this.getmain()
        },
        handleTopChange(status) {
          this.topStatus = status;
        },
        loadTop(){
          console.log(this.index)
          this.page = 1
          this.$('user/team', {sub_type:this.sub_type,page:this.page,pagesize:this.pagesize}, res => {
            if (res.code === 200) {
              this.list = res.data
              this.$refs.loadmore.onTopLoaded();
            }
          })
        },
        loadBottom() {
          if (this.start) {
            if (this.index == 0) {
              if (this.stateA) {
                this.pageA++
                this.page = this.pageA
              }

            } else {
              if (this.stateB) {
                this.pageB++
                this.page = this.pageB
              }
            }
            this.getmain()
            // this.allLoaded = true;// 若数据已全部获取完毕
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
    z-index: 999;
  }
  .top{
    background: #FFFFFF;
  }
  .inform{
    padding: 30px 0;
    border-bottom: 1px solid #E6E6E6;
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
  .border_right{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 1px!important;
    height: 27px;
    background: #E6E6E6;
  }
  .tip{
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    background: #FFF7E5;
    color: #FA7624;
  }
  .box{
    overflow: scroll;
    margin-top: 10px;
    background: #FFFFFF;
  }
  .bbox{
    min-height: calc(100vh - 248px);
  }
  .list{
    display: flex;
    justify-content: flex-start;
    padding: 17px 0 23px 18px;
    border-bottom: 1px solid #E6E6E6;
  }
  .head_icon{
    width: 35px;
    height: 35px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;
  }
  .name{
    font-size: 14px;
    line-height: 18px;
    margin-bottom: 6px;
  }
  .form_box{
    display: flex;
    justify-content: flex-start;
    line-height: 13px;
    font-size: 11px;
  }
  .time{
    width: 150px;
    color: #666666;
  }
  .box>>>.mint-loadmore-content{
    height: 100%;
  }
</style>
