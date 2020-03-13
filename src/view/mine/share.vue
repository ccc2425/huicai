<template>
    <div>
      <headerBack :title="title"></headerBack>
      <div class="img_box pr">
        <img src="../../assets/image/share.png" alt="">
        <div class="code"></div>
      </div>
      <div class="btn_box">
        <div class="btn">分享好友</div>
      </div>
    </div>
</template>

<script>
    import headerBack from "../../components/headerBack"
    export default {
      name: "share",
      components:{
        headerBack,
      },
      data() {
        return {
          title: '推荐好友',
        }
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
</style>
