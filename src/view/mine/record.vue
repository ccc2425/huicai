<template>
  <div>
    <div style="background: #FFFFFF">
      <headerBack :title="title"></headerBack>
    </div>
    <div class="box">
      <div class="">
        <div class="list_boxs">
          <mt-loadmore style="height: 100%;" :top-method="loadTop" @top-status-change="handleTopChange":bottom-all-loaded="allLoaded" :autoFill="false" :bottom-method="loadBottom" ref="loadmore">
            <div class="het">
              <div class="list_box pad010" v-for="item in list">
                <div class="list1 flex_bettwen">
                  <div>转出方ID：{{item.sole_id}}</div>
                  <div :class="[item.status=='wait'?'font_color':'cob3']">{{item.status| getItemStatus(item.status)}}</div>
                </div>
                <div class="list1">
                  发起时间：{{item.createtime}}
                </div>
                <div class="list1 flex_bettwen">
                  <div>转出数量：<span class="font_color">{{item.score}}</span></div>
                  <div class="btns" :class="[item.status=='wait'?'btnbg':'bgccc']" @click="lookWorld(item.status,item.trans_code)">交易码</div>
                </div>
              </div>
            </div>
          </mt-loadmore>
        </div>
      </div>
    </div>
    <alert3 v-if="alertShow" :text="text" :state="states" :tishi="tishi" @getAlert="fromAlert"></alert3>
  </div>
</template>

<script>
    import headerBack from '../../components/headerBack'
    import alert3 from "../../components/alert/alert3"
    export default {
      name: "record",
      components:{
        headerBack,
        alert3
      },
      data(){
        return{
          title:'转让记录',
          index:0,
          list:[],
          trans_type:'out',
          page:1,
          pagesize: 10,
          topStatus: '',
          state:true,
          allLoaded:false,
          text:'',
          alertShow:false,
          tishi:true,
          states:1
        }
      },
      mounted(){
        // this.list = this.list1
        window.scrollTo(0, 0)
        this.getmain()
      },
      methods:{
        getmain(){
          this.$('user/translog', {trans_type:this.trans_type,page:this.page,pagesize:this.pagesize}, res => {
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
          console.log(this.index)
          this.page = 1
          this.$('user/translog', {trans_type:this.trans_type,page:this.page,pagesize:this.pagesize}, res => {
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
            // this.allLoaded = true;// 若数据已全部获取完毕
        },
        lookWorld(status,code){//查看交易码
          console.log(code)
          this.text = code
          if (status == 'wait'){
            this.alertShow = true
          } else {
            return false
          }
        },
        fromAlert(data){
          this.alertShow = false
        },
      },
      filters:{
        getItemStatus(key){
          var status = ''
          switch (key) {
            case 'wait':
              status = '进行中'
              break
            case 'fail':
              status = '已取消'
              break
            case 'success':
              status = '已完成'
              break
          }
          return status
        }
      }
    }
</script>

<style scoped>
  .box{
    height: calc(100vh - 50px);
    overflow: scroll;
    padding: 10px;
  }
  /*.list_boxs{*/
  /*}*/

  .het{
    height: calc(100vh - 70px);
  }
  .het::-webkit-scrollbar{
    display: none;
  }
  .list_box{
    width: 355px;
    padding: 0 20px;
    background: #FFFFFF;
    border-radius: 6px;
    line-height: 50px;
    font-size: 14px;
    margin-bottom: 10px;
  }
  .list_box:last-child{
    margin-bottom: 0;
  }
  .pad010{
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .list1{
    line-height: 30px;
  }
  .list span{
    display: inline-block;
    width: 90px;
    margin-right: 2px;
  }
  .btns{
    width: 70px;
    height: 25px;
    line-height: 25px;
    border-radius: 4px;
    color: #FFFFFF;
    text-align: center;
  }

</style>
