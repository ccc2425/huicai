/**
 * 各种画echarts图表的方法都封装在这里
 * 注意：这里echarts没有采用按需引入的方式，只是为了方便学习
 */

import echarts from 'echarts'
const install = function(Vue) {
  Object.defineProperties(Vue.prototype, {
    $chart: {
      get() {
        return {
          //画一条简单的线
          line1: function (id,time,datas) {
            this.chart = echarts.init(document.getElementById(id));
            this.chart.clear();
            // console.log(time)
            const optionData = {
              grid:{
                width:320,
                height:200,
                left:30,
                bottom:20,
              },
              xAxis: {
                type: 'category',
                boundaryGap: true,
                data: time,
                axisLine:{
                  lineStyle:{
                    color : '#aaa'
                  }
                }
              },
              yAxis: {
                type: 'value',
                // min:3.5,
                // max:6,
                axisLine:{
                  lineStyle:{
                    color : '#aaa'
                  }
                }
              },
              series: [{
                data: datas,
                type: 'line',
                symbol: 'circle',
                itemStyle: {
                  normal: {
                    color: "#FF9D4D",
                    areaStyle: {
                      // color:"#EDA736",
                      color:"rgba(237, 167, 54, 0.2)",
                    },
                    lineStyle:{
                      color:'#FF9D4D'
                    }
                  }
                },
              }]
            };

            this.chart.setOption(optionData);
          },
        }
      }
    }
  })
}

export default {
  install
}
