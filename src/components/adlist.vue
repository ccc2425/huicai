<template>
    <div class="box">
      <div v-for="item in list" class="list clearfix" @click="openDetail">
        <div class="list_img fl pr">
          <img :src="item.img" alt="">
          <div v-if="!state" class="overdue">已过期</div>
        </div>
        <div class="list_item fl">
          <div class="list_tit">{{item.tit}}</div>
          <div class="list_text">{{item.text}}</div>
          <div class="list_bottom">
            <div>{{item.date}}</div>
            <div><i class="iconfont">&#xe622;</i> {{item.num}}</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "adlist",
      props:['list','state'],
      data(){
        return{

        }
      },
      methods:{
        openDetail(){
          this.$router.push('/business/ad_detail')
        }
      }
    }
</script>

<style scoped>
  .box{
    padding: 10px;
  }
  .list{
    padding: 10px;
    background: #ffffff;
    border-radius: 6px;
    color: #999999;
    margin-bottom: 10px;
    font-size: 15px;
  }
  .list_img{
    width: 100px;
    height: 100px;
    margin-right: 10px;
  }
  .list_item{
    width: 220px;
  }
  .list_tit{
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #333333;
    margin-bottom: 4px;
    font-weight: bold;
  }
  .list_text{
    height: 57px;
    font-size: 12px;
    line-height: 20px;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .list_bottom{
    display: flex;
    justify-content: space-between;
    font-size: 11px;
    line-height: 20px;
    height: 20px;
  }
  .overdue{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    line-height: 100px;
    text-align: center;
    color: #ffffff;
    background: rgba(0,0,0,0.6);
  }
</style>
