<template>
    <div>
      <div style="background: #FFFFFF;border-bottom: 1px solid #E6E6E6">
        <headerBack :title="title"></headerBack>
      </div>
      <div class="box">
        <div class="list">
          <span>收货人</span>
          <input type="text" placeholder="请填写姓名" v-model="datas.name">
        </div>
        <div class="list">
          <span>联系电话</span>
          <input type="text" placeholder="请填写联系电话" v-model="datas.tel">
        </div>
        <div class="list pr">
          <span>配送地址</span>
          <input @click="cx" type="text" placeholder="请选择省、市、区" readonly="true" v-model="datas.address">
          <i class="iconfont icon">&#xe623;</i>
        </div>
        <div class="text_list">
          <textarea v-model="ad_detail" placeholder="请填写详细地址(街道、楼牌号等)"></textarea>
        </div>
      </div>
      <div class='add_border flex_bettwen'>
        <div>设为默认地址</div>
        <img @click="qiehuan(0)" src="../../assets/image/i5.png" v-show="datas.default === 1">
        <img @click="qiehuan(1)" v-show="datas.default === 0" src="../../assets/image/i4.png">
      </div>
      <div class="foot">
        <div class="btn">保存并使用</div>
      </div>
      <div class='xuanzhe' v-show="head">
        <ul>
          <li class='jiantou' v-for="(item,index) in options" :key="index" @click="shen(item.value,item.label)">{{item.label}}</li>
        </ul>
        <ul>
          <li class='jiantou' v-for="(item,index) in options1" :key="index" @click="shi(item.value,item.label)">{{item.label}}</li>
        </ul>
        <ul>
          <li class='jiantou' v-for="(item,index) in options2" :key="index" @click="qu(item.value,item.label)">{{item.label}}</li>
        </ul>
      </div>
    </div>
</template>

<script>
    import headerBack from "../../components/headerBack"
    export default {
      name: "add_address",
      components:{
        headerBack
      },
      data() {
        return {
          title: '新增收货地址',
          datas: {
            address: '',
            tel: '',
            name: localStorage.getItem('user'),
            default: 1,
          },
          head: false,
          ad_detail:'',
          options: [
            {label:'福建',value:'12'},
            {label:'四川',value:'12'},
            {label:'山东',value:'12'},
            {label:'上海',value:'12'},
            {label:'北京',value:'12'},
            {label:'福建',value:'12'},
            {label:'四川',value:'12'},
            {label:'山东',value:'12'},
            {label:'上海',value:'12'},
            {label:'北京',value:'12'},
          ],
          options1: [
            {label:'福建1',value:'12'},
            {label:'四川1',value:'12'},
            {label:'山东1',value:'12'},
            {label:'上海1',value:'12'},
            {label:'北京1',value:'12'},
            {label:'福建1',value:'12'},
            {label:'四川1',value:'12'},
            {label:'山东1',value:'12'},
            {label:'上海1',value:'12'},
            {label:'北京1',value:'12'},
          ],
          options2: [
            {label:'福建2',value:'12'},
            {label:'四川3',value:'12'},
            {label:'山东3',value:'12'},
            {label:'上海3',value:'12'},
            {label:'北京3',value:'12'},
            {label:'福建2',value:'12'},
            {label:'四川3',value:'12'},
            {label:'山东3',value:'12'},
            {label:'上海3',value:'12'},
            {label:'北京3',value:'12'},
          ],
          detail_area:[],
        }
      },
      created () {
        if (this.$route.query.bian === 'true') {
          let j = JSON.parse(localStorage.getItem('add_address'))
          this.datas.address = j.address
          this.datas.default = Number(j.is_default)
          this.datas.tel = j.tel
          this.datas.name = j.name
          this.addxian.push(j.detailed)
        }
        // this.$('/need8/getarea', {}, res => {
        //   this.options = res.data
        // })
      },
      methods:{
        qiehuan (i) {
          this.datas.default = i
        },
        cx () {
          this.head = !this.head
        },
        shi (i, e) {
          this.detail_area.splice(1, 2, e)
          this.datas.address = this.detail_area
          // this.$('/need8/getarea', { aid: i }, res => {
          //   this.options2 = res.data
          // })
        },
        qu (i, e) {
          this.detail_area.splice(2, 1, e)
          // this.datas.aid = i
          this.head = false
          this.datas.address = this.detail_area
        },
        shen (i, e) {
          // this.options2 = []
          this.detail_area = []
          this.detail_area.push(e)
          this.datas.address = this.detail_area
          // this.$('/need8/getarea', { aid: i }, res => {
          //   this.options1 = res.data
          // })
        },
      }
    }
</script>

<style scoped>
  .box{
    padding: 0 12px;
    background: #FFFFFF;
    margin-bottom: 8px;
  }
  .list{
    line-height: 48px;
    border-bottom: 1px solid #EEEEEE;
  }
  .list span{
    display: inline-block;
    width: 100px;
    color: #666666;
  }
  .list input{
    width: 210px;
  }
  .icon{
    position: absolute;
    right: 0;
    color: #AAAAAA;
  }
  .text_list textarea{
    resize: none;
    width: 100%;
    height: 90px;
    padding: 25px 0;
    line-height: 20px;
  }
  .add_border{
    padding: 24px 14px;
    line-height: 20px;
    background: #FFFFFF;
  }
  .add_border img{
    width: 36px;
    height: 20px;
  }
  .foot{
    position: fixed;
    bottom: 9px;
    left: 0;
    width: 100%;
  }

  .xuanzhe{
    width: 100%;
    display: flex;
    height: 240px;
    padding: 5px 0;
    overflow: hidden;
    position: fixed;
    left: 0;
    bottom: 0;
    background: #fff;
  }
  .xuanzhe>ul{
     flex: 1;
     width: 100%;
     height: 100%;
     overflow-y: scroll;
  }
  .xuanzhe>ul:nth-of-type(2){
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;
   }
  .xuanzhe>ul>li{
     list-style: none;
     line-height: 34px;
     height: 34px;
     overflow:hidden;
     box-sizing: border-box;
     padding: 0 10px;
  }
  .xuanzhe>ul::-webkit-scrollbar{
     display: none;
  }
  .jiantou {
    position: relative;
  }
</style>
