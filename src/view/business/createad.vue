<template>
  <div>
    <headerBack :title="title"></headerBack>
    <div class="tip">
      <i class="iconfont">&#xe60c;</i> 当前积分余额：2000
    </div>
    <div class="box">
      <div class="title">
        添加广告图
      </div>
      <div class="img_box">
        <div v-for="(item,i) in imgList" class="img" v-if="upShow">
          <div class="pr">
            <i class="iconfont icon" @click="deleteImg(i)">&#xe73d;</i>
            <img :src="item" alt="">
          </div>
        </div>
      </div>
      <div v-if="!upShow" class="add_img pr mb30">
        <input class="upimg" type="file" @change="getImg" accept="image/*" value="" />
        <div>
          <img src="../../assets/image/i6.png" alt="">
        </div>
        <p class="add">上传广告图</p>
        <p>图片不超过2M</p>
      </div>
      <div class="title">
        添加广告标题
      </div>
      <div class="list mb30">
        <input type="text" class="iconfont iptcob ipt" maxlength="12" onchange="this.value=this.value.substring(0, 12)" onkeydown="this.value=this.value.substring(0, 12)" onkeyup="this.value=this.value.substring(0, 12)" :placeholder="icon1">
      </div>
      <div class="title">
        添加广告内容
      </div>
      <div class="list mb30">
        <textarea type="text" class="iconfont iptcob ipt" maxlength="2000" onchange="this.value=this.value.substring(0, 2000)" onkeydown="this.value=this.value.substring(0, 2000)" onkeyup="this.value=this.value.substring(0, 2000)" :placeholder="icon2"></textarea>
      </div>
      <div class="lists">
        <div class="item flex_bettwen">
          <div>广告位置</div>
          <div @click="close">
            <input type="text" class="ad" placeholder="请选择广告位置" readonly="true" v-model="choseIpt">
            <i class="iconfont icon">&#xe634;</i>
          </div>
        </div>
        <div class="item flex_bettwen">
          <div>广告消耗积分</div>
          <div>
            <i @click="less" class="iconfont icon_less coccc">&#xe620;</i>
            <input class="num" type="number" v-model="num">
            <i @click="add" class="iconfont icon_add font_color">&#xe621;</i>
          </div>
        </div>
        <div class="text">
          <p><span class="co666">普通广告</span>默认消耗<span>10积分</span>，可选择10的倍数增加，消耗积分越多广告排序越靠前；最高消耗为<span>100积分</span></p>
          <p><span class="co666">置顶广告</span>默认消耗<span>1000积分</span></p>
        </div>
      </div>
      <div class="btn">发布</div>
    </div>
    <div class="foot" v-if="footShow">
      <div class="bg" @click="close"></div>
      <div class="foot_box">
        <div class="foot_tit">广告位选择</div>
        <div class="foot_list pr" @click.stop="choseThis(1,'普通广告')" :class="{chose:choseShow==1}">普通广告<i class="iconfont foot_icon" v-if="choseShow==1">&#xe610;</i></div>
        <div class="foot_list pr" @click.stop="choseThis(2,'置顶广告')" :class="{chose:choseShow==2}">置顶广告<i class="iconfont foot_icon" v-if="choseShow==2">&#xe610;</i></div>
      </div>
    </div>
    <tishi :tishi="tishi" tishiShow="tishiShow"></tishi>
  </div>
</template>

<script>
    import headerBack from "../../components/headerBack"
    import tishi from "../../components/tishi"
    export default {
      name: "createad",
      components:{
        headerBack,
        tishi
      },
      data() {
        return {
          title: '创建广告',
          icon1: '\ue685 标题不超过12个字符',
          icon2: '\ue685 内容不超过2000个字符',
          num:10,
          imgList:[],
          upShow:false,
          tishi:'',
          tishiShow:false,
          choseShow:0,
          ad1:'普通广告',
          ad2:'置顶广告',
          footShow:false,
          choseIpt:'',
        }
      },
      methods:{
        less(){
          this.num --
          if(this.num<=0){
            this.num = 0
            return false
          }
        },
        add(){
          this.num ++
        },
        getImg(val){
          let that = this;
          var imgFile = val.target.files[0];
          console.log(imgFile)
          var imgSize = imgFile.size;
          console.log(1024*1024*2)
          console.log(imgSize)
          if (imgSize>1024*1024*2){
            this.tishi = '图片大小不能超过2M'
            this.tishiShow = true
            setTimeout(()=>{
              this.tishiShow = false
            },1000)
            return false
          }
          var reader = new FileReader();
          reader.readAsDataURL(imgFile)
          reader.onload = function (e) {
            that.imgList.push(e.target.result)
            // this.imgList.push.apply(this.imgList,e.target.result)
            if (that.imgList.length>=1){
              that.upShow = true
            } else {
              that.upShow = false
            }
          }
        },
        deleteImg(i){
          this.imgList.splice(i,1)
          this.upShow = false
        },
        choseThis(index,text){
          this.choseShow = index
          this.choseIpt = text;
          this.footShow = false;
        },
        close(){
          this.footShow = !this.footShow
        }
      }
    }
</script>

<style scoped>
  .tip{
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 12px;
    background: #FFF7E5;
    color: #FA7624;
  }
  .tip i{
    font-size: 12px;
  }
  .box{
    padding: 10px;
  }
  .title{
    font-weight: bold;
    margin-bottom: 15px;
  }
  .add_img{
    width: 140px;
    height: 135px;
    padding: 30px 0 20px;
    text-align: center;
    font-size: 12px;
    color: #999999;
    background: #FFFFFF;
    border-radius: 4px;
  }
  .add_img>div{
    width: 34px;
    height: 34px;
    margin: 0 auto 16px;
  }
  .add{
    font-size: 13px;
    color: #333333;
    margin-bottom: 6px;
  }
  .upimg{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }
  .img_box{
    width: 300px;
    margin: auto;
  }
  .list{
    padding: 15px;
    background: #FFFFFF;
    border-radius: 4px;
  }
  .ipt{
    width: 100%;
  }
  textarea.ipt{
    height: 160px;
    line-height: 24px;
    resize: none;
  }
  .lists{
    padding: 0 15px;
    background: #FFFFFF;
    border-radius: 4px;
    margin-bottom: 10px;
  }
  .item{
    line-height: 50px;
    border-bottom: 1px solid #F5F5F5;
  }
  .item .ad{
    width: 120px;
    text-align: right;
  }
  .num{
    width: 30px;
    margin: 0px 10px;
    text-align: center;
    color: #FA7624;
  }
  .text{
    padding: 10px 0;
    line-height: 24px;
    font-size: 12px;
    color: #999999;
  }
  .text span{
    color: #FA7324;
  }
  .btn{
    width: 100%;
  }
  .img{
    width: 300px;
    margin: 10px auto;
  }
  .icon{
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 20px;
    color: #FFFFFF;
  }
  .foot{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.7);
  }
  .bg{
    width: 100%;
    height: 100%;
  }
  .foot_box{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background: #FFFFFF;
    padding: 20px 20px 0 20px;
  }
  .foot_tit{
    font-size: 17px;
    text-align: center;
    font-weight: bold;
    margin-bottom: 31px;
  }
  .foot_list{
    line-height: 50px;
  }
  .foot_icon{
    position:absolute;
    right: 0;
  }
  .chose{
    color: #FA7624;
  }
</style>
