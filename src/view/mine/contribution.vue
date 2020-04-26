<template>
    <div>
      <headerBack :title="title"></headerBack>
      <div class="out">
        <div class="box" v-html="info">
<!--          <p>-->
<!--            <span class="dot"></span>-->
<!--            每完成一个实名会员增加1点贡献值，会员投放广告<span>10个</span>积分增加<span>10点</span>贡献值。-->
<!--          </p>-->
<!--          <p>-->
<!--            <span class="dot"></span>-->
<!--            一级代理商：直推会员中含有5名广告主，贡献值达到200点奖励10个积分，线下会员商城产品购买奖励<span>10%</span>;-->
<!--          </p>-->
<!--          <p>-->
<!--            <span class="dot"></span>-->
<!--            二级代理商：直推会员中含有5名一级代理商，贡献值达到1000点奖励100个积分，线下会员商城产品购买奖励<span>20%</span>;-->
<!--          </p>-->
<!--          <p>-->
<!--            <span class="dot"></span>-->
<!--            三级代理商：直推会员中含有5名二级代理商，贡献值达到10000点奖励1000个积分线下会员商城产品购买奖励<span>20%</span>;-->
<!--          </p>-->
<!--          <p>-->
<!--            <span class="dot"></span>-->
<!--            同级别拦截，极差的奖励制度-->
<!--          </p>-->
        </div>
      </div>
    </div>
</template>

<script>
    import headerBack from "../../components/headerBack"
    export default {
      name: "contribution",
      components:{
        headerBack
      },
      data(){
          return{
            title:'贡献值说明',
            info:''
          }
      },
      mounted() {
        this.getData()
      },
      methods:{
        getData(){
          this.$('common/helper',{type:'ded'},(res)=>{
            console.log(res)
            if (res.code === 200){
              this.info = res.data
            }
          })
        }
      }
    }
</script>

<style scoped>
  .out{
    padding: 10px;
  }
  .box{
    padding: 15px 22px 15px 30px;
    background: #FFFFFF;
    border-radius: 4px;
    font-size: 15px;
    line-height: 26px;
  }
  .box p{
    position: relative;
    margin-bottom: 20px;
  }
  .dot{
    position: absolute;
    left: -18px;
    top: 10px;
    display: inline-block;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #FA7624;
  }
  .box span{
    color: #FA7624;
  }
</style>
