<template>
    <div>
      <headerBack :title="title"></headerBack>
      <div class="box">
        <div class="list">
          <div class="text mb15">
            留言：希望能有更多的不同行业的广告展示，希望能有更多的不同行业的广告展示，希望能有更多的不同行业的广告展示...
          </div>
          <div class="img_box mb15">
            <img src="../../assets/image/ban.png" alt="">
          </div>
          <div class="time mb15">2020-03-09 16:13</div>
          <div class="reply">客服：后续我们会增加更多的行业广告，感谢您的本次建议。</div>
        </div>
        <div class="list">
          <div class="text mb15">
            留言：希望能有更多的不同行业的广告展示，希望能有更多的不同行业的广告展示，希望能有更多的不同行业的广告展示...
          </div>
          <div class="img_box mb15">
            <img src="../../assets/image/ban.png" alt="">
          </div>
          <div class="time mb15">2020-03-09 16:13</div>
<!--          <div class="reply">客服：后续我们会增加更多的行业广告，感谢您的本次建议。</div>-->
        </div>
      </div>
      <div class="btn_box">
        <div class="btn" @click="proposal">我要建议</div>
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
        }
      },
      methods:{
        proposal(){
          this.$router.push('/mine/proposal')
        }
      }
    }
</script>

<style scoped>
  .box{
    padding: 10px 10px 60px;
    color: #999999;
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
