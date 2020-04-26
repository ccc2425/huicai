<template>
  <div>
    <headerBack :title="title"></headerBack>
    <div class="tip">
      <i class="iconfont">&#xe60c;</i> 当前HC余额：{{score}}
    </div>
    <div class="box">
      <div class="title">
        添加广告图
      </div>
      <div class="img_box">
        <div class="img" v-if="upShow">
<!--          <div v-for="(item,i) in imgList" class="img" v-if="upShow">-->
          <div class="pr">
            <i class="iconfont icon" @click="deleteImg(i)">&#xe73d;</i>
            <img :src="datas.imgList" alt="">
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
        <input type="text" v-model="datas.tit" class="iconfont iptcob ipt" maxlength="12" onchange="this.value=this.value.substring(0, 12)" onkeydown="this.value=this.value.substring(0, 12)" onkeyup="this.value=this.value.substring(0, 12)" :placeholder="icon1">
      </div>
      <div class="title">
        添加广告内容
      </div>
      <div class="list mb30">
        <textarea type="text" v-model="datas.context" class="iconfont iptcob ipt" maxlength="2000" onchange="this.value=this.value.substring(0, 2000)" onkeydown="this.value=this.value.substring(0, 2000)" onkeyup="this.value=this.value.substring(0, 2000)" :placeholder="icon2"></textarea>
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
            <input class="num" type="number" v-model="datas.num">
            <i @click="add" class="iconfont icon_add font_color">&#xe621;</i>
          </div>
        </div>
        <div class="text">
          <p><span class="co666">普通广告</span>默认消耗<span>10积分</span>，可选择10的倍数增加，消耗积分越多广告排序越靠前；最高消耗为<span>100积分</span></p>
          <p><span class="co666">置顶广告</span>默认消耗<span>1000积分</span></p>
        </div>
      </div>
      <div class="btn" @click="upData">发布</div>
    </div>
    <div class="foot" v-if="footShow">
      <div class="bg" @click="close"></div>
      <div class="foot_box">
        <div class="foot_tit">广告位选择</div>
        <div class="foot_list pr" @click.stop="choseThis(1,'普通广告','normal')" :class="{chose:choseShow==1}">普通广告<i class="iconfont foot_icon" v-if="choseShow==1">&#xe610;</i></div>
        <div class="foot_list pr" @click.stop="choseThis(2,'置顶广告','top')" :class="{chose:choseShow==2}">置顶广告<i class="iconfont foot_icon" v-if="choseShow==2">&#xe610;</i></div>
      </div>
    </div>
    <tishi :tishi="tishi" :tishiShow="tishiShow"></tishi>
    <alert5 v-if="alertShow" @getAlert="fromAlert" :datas="datas"></alert5>
  </div>
</template>

<script>
    import headerBack from "../../components/headerBack"
    import tishi from "../../components/tishi"
    import alert5 from "../../components/alert/alert5"
    import { Toast,MessageBox } from 'mint-ui';
    export default {
      name: "createad",
      components:{
        tishi,
        headerBack,
        alert5,
        Toast,
        MessageBox
      },
      data() {
        return {
          title: '',
          icon1: '\ue685 标题不超过12个字符',
          icon2: '\ue685 内容不超过2000个字符',
          upShow:false,
          tishi:'',
          tishiShow:false,
          choseShow:0,
          ad1:'普通广告',
          ad2:'置顶广告',
          footShow:false,
          score:localStorage.getItem('score'),
          alertShow:false,
          choseIpt:'',
          datas:{
            ad_id:'',
            tit:'',
            context:'',
            trade_pwd:'',
            choseIpts:'',
            num:0,
            imgList:'',
          },
          imgUrl:'',
        }
      },
      mounted(){
        window.scrollTo(0,0)
        if (this.$route.query.ad_id){
          this.title = '编辑广告'
          let ad_detail = JSON.parse(localStorage.getItem('ad_detail'))
          this.datas.ad_id = ad_detail.id
          this.datas.tit = ad_detail.title
          this.datas.context = ad_detail.content
          this.datas.imgList = ad_detail.master_img
          this.upShow = true
        } else {
          this.title = '创建广告'
          localStorage.setItem('go',1)
        }
      },
      methods:{
        less(){
          this.datas.num -=10
          if(this.datas.num<=0){
            this.datas.num = 0
            return false
          }
        },
        add(){
          this.datas.num +=10
        },
        getImg(val){
          let that = this;
          console.log(val)
          var imgFile = val.target.files[0];
          var imgSize = imgFile.size;
          if (imgSize>1024*1024*2){
            Toast({
              message: '图片大小不能超过2M',
              position: 'middle',
              duration: 500
            });
            return false
          }
          var reader = new FileReader();
          reader.readAsDataURL(imgFile)
          reader.onload = function (e) {
            that.imgUrl = e.target.result
            that.imgUrl = that.imgUrl.replace(/:;/, ":image/jpeg;")
            that.$('common/upbase64img', {img:that.imgUrl}, res => {
              console.log(res)
              if (res.code === 200) {
                that.datas.imgList = res.data.url
                Toast({
                  message: res.msg,
                  position: 'middle',
                  duration: 500
                });
                if (that.datas.imgList){
                  that.upShow = true
                } else {
                  that.upShow = false
                }
              }else {
                Toast({
                  message: res.msg,
                  position: 'middle',
                  duration: 500
                });
              }
            })
          }
        },
        deleteImg(i){
          this.datas.imgList = '';
          this.upShow = false
        },
        choseThis(index,text,type){
          this.choseShow = index
          this.choseIpt = text;
          this.footShow = false;
          this.datas.choseIpts = type
          if (index == 1){
            this.datas.num = 10
          } else {
            this.datas.num = 1000
          }
        },
        close(){
          this.footShow = !this.footShow
        },
        upData(){
          if (!this.datas.imgList){
            this.tishi = '请先上传图片'
            this.tishis()
          }else if (!this.datas.tit){
            this.tishi = '请输入广告标题'
            this.tishis()
          }else if (!this.datas.context){
            this.tishi = '请输入广告内容'
            this.tishis()
          }else if (!this.datas.choseIpts){
            this.tishi = '请选择广告位置'
            this.tishis()
          }else {
            let that = this
            if (localStorage.getItem('is_paypwd') == 0){
              MessageBox.confirm('请先设置交易密码').then(action => {
                that.$router.push('/mine/set_password')
              });
            } else {
              this.alertShow = true
            }
          }
        },
        fromAlert(data){
          this.alertShow = false
          console.log(data)
        },
        tishis(){
          this.tishiShow = true
          setTimeout(()=>{
            this.tishiShow = false
          },1000)
          return false
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
    width: 40px;
    margin: 0px 5px;
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
