<template>
  <div>
    <headerBack :title="title"></headerBack>
    <div class="box">
      <textarea class="text iptcob iconfont" :placeholder="icon" v-model="text"></textarea>
      <div class="img_box">
        <div class="img" v-if="imgList.length!=0">
          <div v-for="(item,i) in imgList" class="pr">
            <i class="iconfont icon" @click="deleteImg(i)">&#xe73d;</i>
            <img :src="item" alt="">
          </div>
        </div>
        <div v-if="upShow" class="add_img pr">
          <input class="upimg" type="file" @change="getImg" accept="image/*" value="" />
          <div>
            <img src="../../assets/image/i6.png" alt="">
          </div>
          <p class="add">点击添加图片</p>
          <p>图片不超过3张</p>
        </div>
      </div>
    </div>
    <div class="btn_box">
      <div class="btn" @click="upData">提交建议</div>
    </div>
  </div>
</template>

<script>
    import headerBack from "../../components/headerBack"
    import { Toast  } from 'mint-ui';
    export default {
      name: "proposal",
      components:{
        headerBack,
        Toast
      },
      data(){
        return{
          title:'发布建议',
          icon:'\ue685 请编辑建议内容',
          text:'',
          imgList:[],
          upShow:true,
          id:'',
          imgs:'',
        }
      },
      methods:{
        getImg(val){
          let that = this;
          var imgFile = val.target.files[0];
          var reader = new FileReader();
          reader.readAsDataURL(imgFile)
          reader.onload = function (e) {
            that.$('common/upbase64img', {img:e.target.result}, res => {
              console.log(res)
              if (res.code === 200) {
                that.imgList.push(res.data.url)
                Toast({
                  message: res.msg,
                  position: 'middle',
                  duration: 1000
                });
                if (that.imgList.length>=3){
                  that.upShow = false
                } else {
                  that.upShow = true
                }
              }
            })
          }
        },
        deleteImg(i){
          this.imgList.splice(i,1)
          this.upShow = true
        },
        upData(){
          console.log(this.imgList)
          for (let i = 0; i < this.imgList.length; i++) {
            if (i==0){
              this.imgs +=this.imgList[i]
            }else {
              this.imgs += ',' + this.imgList[i]
            }
          }
          console.log(this.imgs)
          this.$('user/feedback', {content:this.text,imgs:this.imgs}, res => {
            console.log(res)
            if (res.code === 200) {
              Toast({
                message: res.msg,
                position: 'middle',
                duration: 1000
              });
              setTimeout(()=>{
                this.$router.go(-1)
              },1000)
            }else {
              Toast({
                message: res.msg,
                position: 'middle',
                duration: 1000
              });
            }
          })
        }
      }
    }
</script>

<style scoped>
  .box{
    width: 355px;
    margin: 10px auto;
    border-radius: 6px;
    background: #FFFFFF;
    padding: 15px;
  }
  .text{
    width: 100%;
    height: 120px;
    line-height: 24px;
    font-size: 15px;
  }
  .img_box{
    display: flex;
    justify-content: flex-start;
    padding: 10px 0;
  }
  .add_img{
    width: 100px;
    height: 100px;
    padding: 10px 0;
    text-align: center;
    font-size: 12px;
    color: #999999;
    background: #F5F5F5;
  }
  .add_img>div{
    width: 34px;
    height: 34px;
    margin: 0 auto 10px;
  }
  .add{
    font-size: 13px;
    color: #333333;
    margin-bottom: 6px;
  }
  .img{
    display: flex;
    justify-content: flex-start;
  }
  .img div{
    width: 100px;
    height: 100px;
    margin-right: 10px;
  }
  .img div:nth-child(3n){
    margin-right: 0;
  }
  .upimg{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }
  .icon{
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 20px;
    color: #FFFFFF;
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
</style>
