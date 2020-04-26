import axios from 'axios'
import md5 from 'js-md5'
const urls = 'http://gzhtest.xianlubang.com/api/'
const appsecret = '2d4481133c95a64ae9f9583a4b2d3bf5'
// const urls = 'https://daxigou.daxiapp.cn/api/'
// const appsecret = '8801eedd308f5e60ff471eb63bce9ffe'
const $ = (url, data, success) => {
  // if (url.search(/^\/need8/) === -1) {
  //   url = `${urls}${url}`
  //   data.appid = 1000
  // } else {
  //   url = `${urls}${url}`
  //   data.appid = 2
  // }

  url = `${urls}${url}`
  data.appid = 1000
  var timestamp = Date.parse(new Date()) / 1000
  if (localStorage.getItem('token')){
    data.token = localStorage.getItem('token')
  } else {
    data.token = ''
  }
  data.timeline = timestamp
  var str = ''
  var arr = [];
  for(var key in data){
    arr.push(key)
  }
  arr.sort();
  for(var i in arr){
    str +=data[arr[i]]
  }
  str += appsecret;
  data.sign = md5(str)
  axios({
    method: 'post',
    url,
    data,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }]
  })
    .then(function (data) {
        success(data.data)
    })
    .catch(function (data) {
      console.log(data)
      // alert('出现未知错误' + data)
    })
}
export {
  $
}

