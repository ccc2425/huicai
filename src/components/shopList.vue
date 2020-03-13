<template>
    <div class="list">
      <div v-for="item in list" class="item" @click="openItem">
        <div class="img_box">
          <img :src="item.img" alt="">
        </div>
        <div class="text">
          <div class="item_tit">{{item.tit}}</div>
          <div class="item_text">代理价：<span>￥{{item.price}}</span></div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "shopList",
      data(){
        return{
          list:[
            {img:require('../assets/image/item.jpeg'),tit:"春款新品休闲连帽卫衣百搭单品",price:'99.0'},
            {img:require('../assets/image/item.jpeg'),tit:"阿尔法蛋帆布袋",price:'99.0'},
            {img:require('../assets/image/item.jpeg'),tit:"春款新品特别推出",price:'128.0'},
            {img:require('../assets/image/item.jpeg'),tit:"还在等什么,买它~",price:'27.3'},
            {img:require('../assets/image/item.jpeg'),tit:"雨师餐饮疫期不打烊",price:'11.1'},
            {img:require('../assets/image/item.jpeg'),tit:"雨师餐饮疫期不打烊",price:'69.9',},
          ]
        }
      },
      methods:{
        openItem(){
          this.$router.push('/shop/item')
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
    padding-bottom: 15px;
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
    padding: 5px 0;
    color: #333333;
    font-size: 14px;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height: 20px;
  }
  .item_text{
    color: #FB5151;
    line-height: 20px;
  }
  .item_text span{
    font-size: 16px;
    font-weight: bold;
  }
</style>
