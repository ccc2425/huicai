<template>
    <div>
      <div class="head">交易</div>
      <div class="zhanwei"></div>
      <div class="img_box">
        <img src="../assets/image/b1.png" alt="">
      </div>
      <div class="box">
        <p class="text">如需买卖交易请添加<span class="font_color">代理交易中心</span>微信</p>
        <div class="wx"><img src="../assets/image/wx.png" alt=""> {{id}}</div>
        <div class="copy" :data-clipboard-text="id" @click="copy">复制</div>
      </div>
    </div>
</template>

<script>
    import Clipboard from 'clipboard'
    export default {
      name: "trade",
      data(){
          return{
            id:'A133123'
          }
      },
      methods:{
        copy(){
          console.log(1)
          var clipboard = new Clipboard('.wx')
          clipboard.on('success', e => {
            console.log('复制成功', e)
            // Toast({
            //   message: '复制成功'
            // })
            // 释放内存
            clipboard.destroy()
          })
          clipboard.on('error', e => {
            // 不支持复制
            // Toast({
            //   message: '手机权限不支持复制功能'
            // })
            console.log('该浏览器不支持自动复制')
            // 释放内存
            clipboard.destroy()
          })
        }
      }
    }
</script>

<style scoped>
  .head{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    text-align: center;
    font-weight: bold;
    background: #FFFFFF;
  }
  .zhanwei{
    width: 100%;
    height: 40px;
  }
  .img_box{
    width: 300px;
    margin: 50px auto;
  }
  .box{
    width: 335px;
    margin: auto;
    padding: 20px;
    text-align: center;
    border-radius: 6px;
    border: 1px dashed #CCCCCC;
    color: #666666;
  }
  .text{
    font-size: 13px;
    line-height: 20px;
  }
  .wx{
    line-height: 45px;
    font-size: 20px;
    font-weight: bold;
  }
  .wx img{
    width: 21px;
    height: 17px;
  }
  .copy{
    width: 200px;
    height: 30px;
    background: linear-gradient(to right,#F7AE32,#FA7624);
    color: #FFFFFF;
    line-height: 30px;
    border-radius: 6px;
    margin: auto;
    font-size: 14px;
  }
</style>
