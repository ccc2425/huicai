<template>
    <div>
      <div v-for="item in items" class="box">
        <div class="clearfix mb15">
          <div class="fl img_box">
            <img :src="item.master_image" alt="">
          </div>
          <div class="fl item">
            <div class="tit texthiddens">{{item.title}}</div>
            <div class="sizes flex_bettwen">
              <span>{{item.price}}HC</span>
            </div>
          </div>
        </div>
        <div class="flex_bettwen mb15">
          <div class="lh30">购买数量</div>
          <div>x{{item.num}}</div>
        </div>
        <div class="remarks">
          <span>备注</span>
          <div>{{item.remark}}</div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "item_detail",
      props:['items'],
      data(){
          return{

          }
      },
    }
</script>

<style scoped>
  .box{
    width: 355px;
    padding: 12px;
    margin: auto;
    background: #FFFFFF;
    border-radius: 6px;
    margin-bottom: 10px;
  }
  .img_box{
    width: 100px;
    height: 100px;
    margin-right: 10px;
  }
  .item{
    width: 220px;
    line-height: 20px;
  }
  .tit{
    margin-bottom: 10px;
  }
  .remarks{
    font-size: 13px;
    line-height: 30px;
    display: flex;
    justify-content: flex-start;
  }
  .remarks span{
    display: inline-block;
    width: 45px;
  }
  .remarks div{
    width: 240px;
  }

</style>
