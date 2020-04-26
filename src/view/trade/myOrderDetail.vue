<template>
  <div>
    <headerBack :title="title"></headerBack>
    <div class="box">
      <div class="list flex_bettwen">
        <span class="fs14">订单号</span><span class="co999">{{datas.order_id}}</span>
      </div>
      <div class="list flex_bettwen">
        <span class="fs14">完成时间</span><span class="co999">{{datas.ex_time}}</span>
      </div>
    </div>
  </div>
</template>

<script>
    import headerBack from "../../components/headerBack"
    export default {
      name: "myOrderDetail",
      components:{
        headerBack
      },
      data(){
          return{
            title:'订单详情',
            order_id:'',
            datas:'',
          }
      },
      mounted(){
        this.order_id = this.$route.query.order_id
        this.getmain()
      },
      methods:{
          getmain(){
            this.$('score/order',{order_id:this.order_id},res=>{
              console.log(res)
              if (res.code === 200){
                this.datas = res.data
              }
            })
          }
      }
    }
</script>

<style scoped>
  .box{
    width: 355px;
    margin: 10px auto;
    padding: 0 13px;
    line-height: 40px;
    border-radius: 6px;
    background: #FFFFFF;
  }
</style>
