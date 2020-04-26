<template>
    <div>
      <div ref="head">
        <headerBack :title="title"></headerBack>
      </div>
      <div class="top_b"></div>
      <div class="clearfix">
        <div class="fl">
          <ul class="l_box">
            <li v-for="(item,i) in list" class="l_list pr" :class="{active:index==i}" @click="chose(i)">{{item.class_name}}</li>
          </ul>
        </div>
        <div  ref="content" class="fl r_box">
          <div v-for="(item,i) in list" class="item" :ref="item.refname">
            <div class="tit">{{item.class_name}}</div>
            <div class="list_box">
              <div v-for="items in item.children">
                <div class="list" @click="openList(items.id)">
                  <div class="item_img">
                    <img :src="items.pic" alt="">
                  </div>
                  {{items.class_name}}
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
    import { Indicator } from 'mint-ui';
    export default {
      name: "classfy",
      components:{
        headerBack,
        Indicator
      },
      data(){
        return{
          title:'全部分类',
          index:0,
          list:[],
        }
      },
      mounted(){
        this.getmain()
      //     // 监听滚动事件
      //     window.addEventListener('scroll', this.onScroll)
      },
      methods:{
        getmain(){
          Indicator.open('加载中...');
          this.$('shop/allclass',{item_id:this.id},res=>{
            console.log(res)
            if (res.code === 200){
              this.list = res.data
              Indicator.close();
            }
          })
        },
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
        openList(id){
          this.$router.push('/shop/item_list?id='+id)
        }
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
