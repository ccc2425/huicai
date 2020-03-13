<template>
    <div class="list">
      <div v-for="item in list" class="item">
        <div class="img_box">
          <img :src="item.img" alt="">
        </div>
        <div class="text">
          <div class="item_tit">{{item.tit}}</div>
          <div class="item_text">{{item.text}}</div>
          <div class="item_foot clearfix">
            <div v-if="item.looked" class="looks"><i class="iconfont">&#xe622;</i>已浏览</div>
            <div class="date">{{item.date}}</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "list",
      data(){
        return{
          list:[
            {img:require('../assets/image/item.jpeg'),tit:"雨师餐饮疫期不打烊",text:'雨师餐饮疫期不打烊，店内订单全部采用全封闭式包装保证食用卫生安全，全场8折！',looked:true,date:'02月27日'},
            {img:require('../assets/image/item.jpeg'),tit:"中考冲刺数理化课程开售",text:'开设初中生语,数,英,理化全科目课程,线上老师实时教学,针对性辅导,线下班主任+学科+心理素质+自习+规划师开设初中生语,数,英,理化全科目课程,线上老师实时教学,针对性辅导,线下班主任+学科+心理素质+自习+规划师...',looked:false,date:'02月27日'},
            {img:require('../assets/image/item.jpeg'),tit:"春款新品特别推出",text:'春款新品休闲运动连帽卫衣，百搭单品，柔软亲肤，穿上它就是街上最靓的仔。上新价仅需99元！',looked:false,date:'02月27日'},
            {img:require('../assets/image/item.jpeg'),tit:"还在等什么,买它~",text:'竹纤维原浆本色纸史上第一次抄底价，仅需19.9元，第二件半价更多优惠在曼心日用生活店。春款新品休闲运动连帽卫衣',looked:false,date:'02月27日'},
            {img:require('../assets/image/item.jpeg'),tit:"雨师餐饮疫期不打烊",text:'雨师餐饮疫期不打烊，店内订单全部采用全封闭式包装保证食用卫生安全，全场8折！春款新品休闲运动连帽卫衣',looked:true,date:'02月27日'},
            {img:require('../assets/image/item.jpeg'),tit:"雨师餐饮疫期不打烊",text:'雨师餐饮疫期不打烊，店内订单全部采用全封闭式包装保证食用卫生安全，全场8折！',looked:false,date:'02月27日'},
          ]
        }
      }
    }
</script>

<style scoped>
  .list{
    /*display: flex;*/
    /*justify-content: space-between;*/
    /*flex-wrap: wrap;*/
    padding: 10px;
    padding-bottom: 0;

    -moz-column-count:2; /* Firefox */
    -webkit-column-count:2; /* Safari 和 Chrome */
    column-count:2;
    -moz-column-gap: 10px;
    -webkit-column-gap: 10px;
    column-gap: 10px;
  }
  .item{
    width: 172px;
    background: #ffffff;
    font-size: 11px;
    border-radius: 6px;
    margin-bottom: 10px;

    -moz-page-break-inside: avoid;
    -webkit-column-break-inside: avoid;
    break-inside: avoid;
  }
  .img_box{
    width: 100%;
    height: 172px;
  }
  .text{
    padding: 0 5px;
  }
  .item_tit{
    color: #333333;
    font-size: 14px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    line-height: 26px;
    font-weight: bold;
  }
  .item_text{
    color: #666666;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    line-clamp: 4;
    -webkit-box-orient: vertical;
    line-height: 20px;
  }
  .item_foot{
    border-top: 1px solid #F5F5F5;
    line-height: 24px;
  }
  .looks{
    float: left;
    color: #FA6B22;
  }
  .date{
    float: right;
    color: #B3B3B3;
  }

</style>
