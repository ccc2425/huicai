<template>
    <div class="list">
      <div v-for="item in list" class="item" @click="openItem(item.item_id)">
        <div class="img_box">
          <img :src="item.master_image" alt="">
        </div>
        <div class="text">
          <div class="item_tit">{{item.title}}</div>
          <div class="item_text">价格：<span>{{item.price}}</span>HC</div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "shopList",
      props:['list'],
      data(){
        return{
        }
      },
      methods:{
        openItem(id){
          this.$router.push('/shop/item?id='+id)
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
    margin: 5px auto;
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
