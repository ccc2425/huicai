<template>
    <div>
      <div style="background: #FFFFFF;border-bottom: 1px solid #E6E6E6">
        <headerBack :title="title"></headerBack>
      </div>
      <div class="list" v-for="(item,i) in list">
        <div class="forms">
            <div>{{item.name}} {{item.tel}}</div>
            <div class="address">{{item.adress}}</div>
          </div>
        <div class="bottom flex_bettwen">
          <div v-if="index == i" class="font_color">
            <i class="iconfont">&#xe626;</i>默认地址
          </div>
          <div v-if="index != i" @click="choseThis(i)">
            <i class="iconfont">&#xe62d;</i>设为默认地址
          </div>
          <div>
            <span class="edit" @click="addAddress(i)"><i class="iconfont">&#xe685;</i>编辑</span>
            <span @click="rmThis(i)"><i class="iconfont">&#xe73d;</i>删除</span>
          </div>
        </div>
      </div>
      <div class="foot">
        <div class="btn" @click="addAddress(-1)">添加收货地址</div>
      </div>
    </div>
</template>

<script>
    import headerBack from "../../components/headerBack"
    export default {
      name: "addres",
      components:{
        headerBack
      },
      data(){
        return{
          title:'收货地址',
          index:0,
          list:[
            {name:'李小晨',tel:'13540861223',adress:'四川省 成都市 高新区 天府五街菁蓉国际广场1B-502',is_default:1},
            {name:'李小晨1',tel:'13540861223',adress:'四川省 成都市 高新区 天府五街菁蓉国际广场1B-502',is_default:0},
            {name:'李小晨2',tel:'13540861223',adress:'四川省 成都市 高新区 天府五街菁蓉国际广场1B-502',is_default:0},
          ]
        }
      },
      methods:{
        choseThis(i){
          this.index = i
          this.list[i].is_default = 1
        },
        rmThis(i){
          console.log(this.list)
          this.list.splice(i,1)
          console.log(this.list)
        },
        addAddress (i) {
          if (i === -1) {
            this.$router.push('/mine/add_address')
          } else {
            localStorage.setItem('add_address', JSON.stringify(this.list[i]))
            this.$router.push('/mine/add_address?bian=true')
          }
        },
      }
    }
</script>

<style scoped>
  .list{
    background: #FFFFFF;
    margin-bottom: 8px;
  }
  .forms{
    padding: 20px 15px 15px;
    line-height: 20px;
    color: #3c3c3c;
  }
  .address{
    font-size: 14px;
    color: #999999;
    margin-top: 10px;
  }
  .bottom{
    padding: 0 15px;
    font-size: 12px;
    line-height: 36px;
    border-top: 1px solid #F5F5F5;
  }
  .bottom .iconfont{
    font-size: 14px;
    margin-right: 4px;
  }
  .edit{
    margin-right: 35px;
  }
  .foot{
    position: fixed;
    bottom: 9px;
    left: 0;
    width: 100%;
  }
</style>
