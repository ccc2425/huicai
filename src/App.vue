<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333333;
  height: 100%;
  font-size: 15px;
}
@font-face {
  font-family: 'iconfont';  /* project id 1675510 */
  src: url('http://at.alicdn.com/t/font_1675510_iimiwqpspa.eot');
  src: url('http://at.alicdn.com/t/font_1675510_iimiwqpspa.eot?#iefix') format('embedded-opentype'),
  url('http://at.alicdn.com/t/font_1675510_iimiwqpspa.woff2') format('woff2'),
  url('http://at.alicdn.com/t/font_1675510_iimiwqpspa.woff') format('woff'),
  url('http://at.alicdn.com/t/font_1675510_iimiwqpspa.ttf') format('truetype'),
  url('http://at.alicdn.com/t/font_1675510_iimiwqpspa.svg#iconfont') format('svg');
}
.iconfont {
  font-family: 'iconfont' !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
.fl{
  float: left;
}
.fr{
  float: right;
}
.clearfix:after{
  content: ' ';
  display: block;
  clear: both;
  visibility:hidden;
  line-height: 0;
  height:0;
}
*{
  outline: none;
  box-sizing: border-box;
}
img{
  width: 100%;
  height: 100%;
}
body{
  margin: 0;
}
.pr{
  position: relative;
}
.flex_bettwen{
  display: flex;
  justify-content: space-between;
}
.flex_around{
  display: flex;
  justify-content: space-around;
}
  .font_color{
    color: #ED7C2B;
  }
  .co666{
    color: #666666!important;
  }
.co999{
  color: #999999;
}
  .coccc{
    color: #cccccc;
  }
.classfys{
  height: 40px;
  line-height: 40px;
  background: #FFFFFF;
  color: #666666;
  text-align: center;
}
.actives{
  color: #FA7624;
  font-weight: bold;
}
.actives:after{
  position: absolute;
  bottom: -1px;
  left: 50%;
  transform: translateX(-50%);
  content: '';
  width: 20px;
  height: 2px;
  background: #EF651B;
  border-radius: 2px;
}
.iptcob::-webkit-input-placeholder{color:#B3B3B3;}
.iptcob::-moz-placeholder{/* Mozilla Firefox 19+ */color:#B3B3B3;}
.iptcob:-moz-placeholder{/* Mozilla Firefox 4 to 18 */color:#B3B3B3;}
.iptcob:-ms-input-placeholder{/* Internet Explorer 10-11 */ color:#B3B3B3;}
  .btn{
    width: 330px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    border-radius: 6px;
    margin: auto;
    background: linear-gradient(to right,#F7AE32,#FA7624);
    color: #FFFFFF;
  }
  .lh30{
    line-height: 30px;
  }
.mb15{
  margin-bottom: 15px;
}
  .mb30{
    margin-bottom: 30px;
  }
  .padb50{
    padding-bottom: 50px;
  }
  .fs18{
    font-size: 18px;
  }
.texthiddens{text-overflow: -o-ellipsis-lastline; overflow: hidden;text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical;}

</style>
