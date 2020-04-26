<template>
    <div class="list">
      <div v-for="item in list" class="item" @click="openad(item.id)">
        <div class="img_box">
          <img :src="item.master_img" alt="">
        </div>
        <div class="text">
          <div class="item_tit">{{item.title}}</div>
          <div class="item_text">{{item.content}}</div>
          <div class="item_foot clearfix">
            <div v-if="item.is_browse" class="looks"><i class="iconfont">&#xe622;</i>已浏览</div>
            <div class="date">{{item.sort_score}}HC</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import { MessageBox } from 'mint-ui'
    export default {
      name: "list",
      props:['list'],
      components:{
        MessageBox
      },
      methods:{
        openad(id){
          let that = this
          // if (localStorage.getItem('is_real')==0){
          //   MessageBox.confirm('请完成实名认证').then(action => {
          //     that.$router.push('/mine/realname')
          //   });
          // }else {
            this.$router.push('/business/ad_detail?type=list&id=' + id)
          // }
        }
      }
    }
</script>

<style scoped>
  .list{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 10px;
    /*padding-bottom: 0;*/

    /*-moz-column-count:2; !* Firefox *!*/
    /*-webkit-column-count:2; !* Safari 和 Chrome *!*/
    /*column-count:2;*/
    /*-moz-column-gap: 10px;*/
    /*-webkit-column-gap: 10px;*/
    /*column-gap: 10px;*/

    min-height: calc(100vh - 275px);
  }
  .item{
    width: 172px;
    max-height: 243px;
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
    white-space: nowrap;
    /*display: -webkit-box;*/
    /*-webkit-line-clamp: 4;*/
    /*line-clamp: 4;*/
    /*-webkit-box-orient: vertical;*/
    line-height: 20px;
  }
  .item_foot{
    border-top: 1px solid #F5F5F5;
    line-height: 24px;
  }
  .looks{
    float: left;
    color: #FA6B22;
    line-height: 24px;
    font-size: 12px;
  }
  .date{
    float: right;
    color: #B3B3B3;
  }

</style>
