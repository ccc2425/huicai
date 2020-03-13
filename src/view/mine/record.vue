<template>
  <div>
    <div style="background: #FFFFFF">
      <headerBack :title="title"></headerBack>
    </div>
    <div class="classfys flex_around">
      <div class="pr" :class="{actives:index==0}" @click="chose(0)">转让记录</div>
      <div class="pr" :class="{actives:index==1}" @click="chose(1)">接收记录</div>
    </div>
    <div class="box">
      <div class="list_box">
        <div class="list_top flex_bettwen">
          <div class="list1">转入ID</div>
          <div class="list2">时间</div>
          <div class="list3">类型</div>
          <div class="list4">状态</div>
        </div>
        <ul>
          <li v-for="item in list" class="list flex_bettwen">
            <div class="list1 co999">{{item.id}}</div>
            <div class="list2 co999 time">{{item.time}}</div>
            <div class="list3 co666">{{item.type}}</div>
            <div class="list4 co666">{{item.state}}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
    import headerBack from '../../components/headerBack'
    export default {
      name: "record",
      components:{
        headerBack
      },
      data(){
        return{
          title:'转让记录',
          index:0,
          list:[],
          list1:[
            {id:'KAS26465',time:'2020-03-09 10:20',type:'转让',state:'已完成'},
            {id:'KAS26465',time:'2020-03-09 10:20',type:'转让',state:'进行中'},
            {id:'KAS26465',time:'2020-03-09 10:20',type:'转让',state:'已取消'},
            {id:'KAS26465',time:'2020-03-09 10:20',type:'转让',state:'进行中'},
          ],
          list2:[
            {id:'KAS26465',time:'2020-03-09 10:20',type:'接收',state:'已完成'},
            {id:'KAS26465',time:'2020-03-09 10:20',type:'接收',state:'进行中'},
            {id:'KAS26465',time:'2020-03-09 10:20',type:'接收',state:'已取消'},
            {id:'KAS26465',time:'2020-03-09 10:20',type:'接收',state:'进行中'},
          ],
        }
      },
      mounted(){
        this.list = this.list1
      },
      methods:{
        chose(index){
          this.index = index
          if (index == 0){
            this.list = this.list1
          } else {
            this.list = this.list2
          }
        },
      }
    }
</script>

<style scoped>
  .box{
    padding: 10px;
  }
  .list_box{
    border-radius: 6px;
    background: #FFFFFF;
    padding: 0 12px;
    text-align: center;
  }
  .list_top{
    line-height: 42px;
    font-size: 14px;
    border-bottom: 1px solid #F5F5F5;
  }
  .list{
    font-size: 12px;
    padding: 14px 0;
    line-height: 26px;
    border-bottom: 1px solid #F5F5F5;
  }
  .time{
    line-height: 13px;
    text-align: left;
  }
  .list1{
    width: 60px;
  }
  .list2{
    width: 75px;
  }
  .list3{
    width: 30px
  }
  .list4{
    width: 50px;
  }
</style>
