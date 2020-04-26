<template>
    <div>
      <headerBack :title="title"></headerBack>
      <div class="img_box pr">
        <img :src="list.share_bg" alt="">
        <div class="code">
          <img id="shareImg" :src="list.qr_img" alt="">
        </div>
        <div class="tip">长按二维码即可保存二维码</div>
      </div>
      <div class="btn_box">
        <div class="btn mb10" @click="shares">分享好友</div>
      </div>
      <div v-if="sheetVisible" class="shareimg" @click="closeShare">
        <img src="../../assets/image/s1.png" alt="">
      </div>
    </div>
</template>

<script>
    import headerBack from "../../components/headerBack"
    import { Toast } from 'mint-ui';
    import wx from 'weixin-js-sdk'
    export default {
      name: "share",
      components:{
        headerBack,
        Toast
      },
      data() {
        return {
          title: '推荐好友',
          list:'',
          wejs:'',
          sheetVisible:false,
        }
      },
      mounted() {
        this.getmain()
      },
      methods:{
        getmain(){
          let that = this
          this.$('user/share',{},res =>{
            console.log(res)
            if (res.code === 200){
              this.list = res.data
              this.wejs = res.data.jsapi_config
              wx.config({
                debug: false, //生产环境需要关闭debug模式
                appId: that.wejs.appId, //appId通过微信服务号后台查看
                timestamp: that.wejs.timestamp, //生成签名的时间戳
                nonceStr: that.wejs.nonceStr, //生成签名的随机字符串
                signature: that.wejs.signature, //签名
                jsApiList: [ //需要调用的JS接口列表
                  'onMenuShareTimeline',
                  'onMenuShareAppMessage',
                  'updateTimelineShareData',
                  'updateAppMessageShareData',
                ]
              })
              wx.checkJsApi({
                jsApiList: [
                  // 所有要调用的 API 都要加到这个列表中
                  'onMenuShareTimeline', // 分享到朋友圈接口
                  'onMenuShareAppMessage', //  分享到朋友接口
                  'updateTimelineShareData',
                  'updateAppMessageShareData',
                ],
                success: function (res) {
                }
              })

              wx.ready(function () {
                var shareData = {
                  title: that.list.share_title, // 分享标题
                  link: that.list.share_url, // 分享链接
                  imgUrl: that.list.share_img, // 分享图标
                  desc: that.list.share_content, // 分享描述
                  success: function () {
                  }
                }
                wx.updateTimelineShareData(shareData)
                wx.updateAppMessageShareData(shareData)
                wx.onMenuShareAppMessage(shareData)
                wx.onMenuShareTimeline(shareData)
              })
            }
          })
        },
        shares(){
          this.sheetVisible = true
        },
        closeShare(){
          this.sheetVisible = false
        },
      }
    }
</script>

<style scoped>
  .img_box{
    width: 100%;
    height: calc(100vh - 150px);
  }
  .btn_box{
    padding: 30px 0;
    background: #FFFFFF;
  }
  .code{
    position: absolute;
    left: 50%;
    bottom: 40px;
    transform: translateX(-50%);
    width: 118px;
    height: 118px;
  }
  .shareimg{
    position: fixed;
    top: 50px;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0,0,0,0.7);
    text-align: center;
  }
  .shareimg img{
    width: 303px;
    height: 237px;
  }
  .mb10{
    /*margin-bottom: 5px;*/
  }
  .tip{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 15px;
    text-align: center;
    font-size: 12px;
    color: #FFFFFF;
    line-height: 20px;
  }
</style>
