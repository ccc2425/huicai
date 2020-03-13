<template>
    <div>
      <div ref="head">
        <headerBack :title="title"></headerBack>
      </div>
      <div class="top_b"></div>
      <div class="clearfix">
        <div class="fl">
          <ul class="l_box">
            <li v-for="(item,i) in l_list" class="l_list pr" :class="{active:index==i}" @click="chose(i)">{{item}}</li>
          </ul>
        </div>
        <div  ref="content" class="fl r_box">
          <div v-for="(item,i) in r_list" class="item" :ref="item.refname">
            <div class="tit">{{item.tit}}</div>
            <div class="list_box">
              <div v-for="items in item.list">
                <div class="list">
                  <div class="item_img">
                    <img :src="items.img" alt="">
                  </div>
                  {{items.name}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import headerBack from "../../components/headerBack"
    export default {
      name: "classfy",
      components:{
        headerBack
      },
      data(){
        return{
          title:'全部分类',
          index:0,
          l_list:['热门','数码','美妆','女装','男装','洗护','童装','生活','母婴','用品','食品','家用'],
          r_list:[
              {tit:'热门推荐',refname:'contents',list:[
                {img:require('../../assets/image/a.png'),name:'饼干蛋糕'},
                {img:require('../../assets/image/a.png'),name:'养生茶饮'},
                {img:require('../../assets/image/a.png'),name:'饮品'},
                {img:require('../../assets/image/a.png'),name:'南北干货'},
                {img:require('../../assets/image/a.png'),name:'特产'},
                {img:require('../../assets/image/a.png'),name:'套装'},
                {img:require('../../assets/image/a.png'),name:'外套'},
                {img:require('../../assets/image/a.png'),name:'帆布鞋'},
              ]},
                {tit:'数码',refname:'contents',list:[
                    {img:require('../../assets/image/a.png'),name:'饼干蛋糕'},
                    {img:require('../../assets/image/a.png'),name:'养生茶饮'},
                    {img:require('../../assets/image/a.png'),name:'饮品'},
                    {img:require('../../assets/image/a.png'),name:'南北干货'},
                    {img:require('../../assets/image/a.png'),name:'特产'},
                    {img:require('../../assets/image/a.png'),name:'套装'},
                    {img:require('../../assets/image/a.png'),name:'外套'},
                    {img:require('../../assets/image/a.png'),name:'帆布鞋'},
                ]},
                {tit:'美妆',refname:'contents',list:[
                    {img:require('../../assets/image/a.png'),name:'饼干蛋糕'},
                    {img:require('../../assets/image/a.png'),name:'养生茶饮'},
                    {img:require('../../assets/image/a.png'),name:'饮品'},
                    {img:require('../../assets/image/a.png'),name:'南北干货'},
                    {img:require('../../assets/image/a.png'),name:'特产'},
                    {img:require('../../assets/image/a.png'),name:'套装'},
                    {img:require('../../assets/image/a.png'),name:'外套'},
                    {img:require('../../assets/image/a.png'),name:'帆布鞋'},
                ]},
            {tit:'女装',refname:'contents',list:[
                {img:require('../../assets/image/a.png'),name:'饼干蛋糕'},
                {img:require('../../assets/image/a.png'),name:'养生茶饮'},
                {img:require('../../assets/image/a.png'),name:'饮品'},
                {img:require('../../assets/image/a.png'),name:'南北干货'},
                {img:require('../../assets/image/a.png'),name:'特产'},
                {img:require('../../assets/image/a.png'),name:'套装'},
                {img:require('../../assets/image/a.png'),name:'外套'},
                {img:require('../../assets/image/a.png'),name:'帆布鞋'},
              ]},
            {tit:'男装',refname:'contents',list:[
                {img:require('../../assets/image/a.png'),name:'饼干蛋糕'},
                {img:require('../../assets/image/a.png'),name:'养生茶饮'},
                {img:require('../../assets/image/a.png'),name:'饮品'},
                {img:require('../../assets/image/a.png'),name:'南北干货'},
                {img:require('../../assets/image/a.png'),name:'特产'},
                {img:require('../../assets/image/a.png'),name:'套装'},
                {img:require('../../assets/image/a.png'),name:'外套'},
                {img:require('../../assets/image/a.png'),name:'帆布鞋'},
              ]},
            {tit:'洗护',refname:'contents',list:[
                {img:require('../../assets/image/a.png'),name:'饼干蛋糕'},
                {img:require('../../assets/image/a.png'),name:'养生茶饮'},
                {img:require('../../assets/image/a.png'),name:'饮品'},
                {img:require('../../assets/image/a.png'),name:'南北干货'},
                {img:require('../../assets/image/a.png'),name:'特产'},
                {img:require('../../assets/image/a.png'),name:'套装'},
                {img:require('../../assets/image/a.png'),name:'外套'},
                {img:require('../../assets/image/a.png'),name:'帆布鞋'},
              ]},
            {tit:'童装',refname:'contents',list:[
                {img:require('../../assets/image/a.png'),name:'饼干蛋糕'},
                {img:require('../../assets/image/a.png'),name:'养生茶饮'},
                {img:require('../../assets/image/a.png'),name:'饮品'},
                {img:require('../../assets/image/a.png'),name:'南北干货'},
                {img:require('../../assets/image/a.png'),name:'特产'},
                {img:require('../../assets/image/a.png'),name:'套装'},
                {img:require('../../assets/image/a.png'),name:'外套'},
                {img:require('../../assets/image/a.png'),name:'帆布鞋'},
              ]},
            {tit:'生活',refname:'contents',list:[
                {img:require('../../assets/image/a.png'),name:'饼干蛋糕'},
                {img:require('../../assets/image/a.png'),name:'养生茶饮'},
                {img:require('../../assets/image/a.png'),name:'饮品'},
                {img:require('../../assets/image/a.png'),name:'南北干货'},
                {img:require('../../assets/image/a.png'),name:'特产'},
                {img:require('../../assets/image/a.png'),name:'套装'},
                {img:require('../../assets/image/a.png'),name:'外套'},
                {img:require('../../assets/image/a.png'),name:'帆布鞋'},
              ]},
            {tit:'母婴',refname:'contents',list:[
                {img:require('../../assets/image/a.png'),name:'饼干蛋糕'},
                {img:require('../../assets/image/a.png'),name:'养生茶饮'},
                {img:require('../../assets/image/a.png'),name:'饮品'},
                {img:require('../../assets/image/a.png'),name:'南北干货'},
                {img:require('../../assets/image/a.png'),name:'特产'},
                {img:require('../../assets/image/a.png'),name:'套装'},
                {img:require('../../assets/image/a.png'),name:'外套'},
                {img:require('../../assets/image/a.png'),name:'帆布鞋'},
              ]},
            {tit:'用品',refname:'contents',list:[
                {img:require('../../assets/image/a.png'),name:'饼干蛋糕'},
                {img:require('../../assets/image/a.png'),name:'养生茶饮'},
                {img:require('../../assets/image/a.png'),name:'饮品'},
                {img:require('../../assets/image/a.png'),name:'南北干货'},
                {img:require('../../assets/image/a.png'),name:'特产'},
                {img:require('../../assets/image/a.png'),name:'套装'},
                {img:require('../../assets/image/a.png'),name:'外套'},
                {img:require('../../assets/image/a.png'),name:'帆布鞋'},
              ]},
            {tit:'食品',refname:'contents',list:[
                {img:require('../../assets/image/a.png'),name:'饼干蛋糕'},
                {img:require('../../assets/image/a.png'),name:'养生茶饮'},
                {img:require('../../assets/image/a.png'),name:'饮品'},
                {img:require('../../assets/image/a.png'),name:'南北干货'},
                {img:require('../../assets/image/a.png'),name:'特产'},
                {img:require('../../assets/image/a.png'),name:'套装'},
                {img:require('../../assets/image/a.png'),name:'外套'},
                {img:require('../../assets/image/a.png'),name:'帆布鞋'},
              ]},
            {tit:'家用',refname:'contents',list:[
                {img:require('../../assets/image/a.png'),name:'饼干蛋糕'},
                {img:require('../../assets/image/a.png'),name:'养生茶饮'},
                {img:require('../../assets/image/a.png'),name:'饮品'},
                {img:require('../../assets/image/a.png'),name:'南北干货'},
                {img:require('../../assets/image/a.png'),name:'特产'},
                {img:require('../../assets/image/a.png'),name:'套装'},
                {img:require('../../assets/image/a.png'),name:'外套'},
                {img:require('../../assets/image/a.png'),name:'帆布鞋'},
              ]},
          ],
        }
      },
      // mounted(){
      //     // 监听滚动事件
      //     window.addEventListener('scroll', this.onScroll)
      // },
      methods:{
        chose(i){
          var that = this;
          this.index = i;
          var headHeight = this.$refs.head.offsetHeight;
          var item_top = this.$refs.contents[i].offsetTop - headHeight -10;
          // this.$refs.content.scrollTop = item_top - headHeight -10;
          let step = item_top / 50;
          let distance = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset//获取滚动条的高度(兼容三种浏览器版本
          if (item_top > distance) { //当divArr.[index]offsetTop的距离>滚动条的距离，向下滑动，此时滑动的距离是total
            smoothDown() //向下滑动
          } else {
            let newTotal = distance - item_top //当div到窗口的距离<滚动条的距离，向上滑动，此时滑动的距离是distance - total
            step = newTotal / 50;
            smoothUp()
          }
          //向下滑动
          function smoothDown () {
            if (distance < item_top) {
              distance = distance + step
              that.$refs.content.scrollTop = distance
              // window.pageYOffset = item_top;
              setTimeout(smoothDown, 5)
            } else {
              that.$refs.content.scrollTop = item_top
              // document.documentElement.scrollTop = item_top
              // window.pageYOffset = item_top;
            }
          }

          //向上滑动
          function smoothUp () {
            if (distance > item_top) {
              distance -= step
              that.$refs.content.scrollTop = distance;
              setTimeout(smoothUp, 10)
            } else {
              that.$refs.content.scrollTop = item_top;
            }
          }
        },
      },
      // destroy() {
      //   // 必须移除监听器，不然当该vue组件被销毁了，监听器还在就会出错
      //   window.removeEventListener('scroll', this.onScroll)
      // },

    }
</script>

<style scoped>
  .top_b{
    width: 100vw;
    height: 1px;
    background: #e5e5e5;
    position: fixed;
    top: 50px;
    left: 0;
    z-index: 999;
  }
  .l_box{
    width: 74px;
    height: calc(100vh - 51px);
    overflow-y: auto;
  }
  .l_box::-webkit-scrollbar{
    display: none;
  }
  .r_box{
    width: calc(100vw - 74px);
    height: calc(100vh - 51px);
    overflow-y: auto;
    background: #FFFFFF;
    padding: 20px 25px;
  }
  .r_box::-webkit-scrollbar{
     display: none;
  }
  .l_list{
    text-align: center;
    color: #808080;
    height: 50px;
    padding: 15px;
    line-height: 20px;
  }
  .active{
    background: #FFFFFF;
    color: #EF651B;
    font-size: 16px;
    font-weight: bold;
  }
  .active:after{
    position: absolute;
    left: 0;
    content: '';
    width: 2px;
    height: 20px;
    background: #EF651B;
  }
  .tit{
    font-weight: bold;
    margin-bottom: 15px;
  }
  .list_box{
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    text-align: center;
  }
  .list_box>div{
    width: 33.3%;
  }
  .list{
    width: 50px;
    /*height: 60px;*/
    margin: 0 auto 10px;
    line-height: 20px;
    font-size: 11px;
  }
  .item_img{
    width: 45px;
    height: 45px;
    margin: 5px auto;
  }
</style>
