import axios from 'axios'
import md5 from 'js-md5'
const urls = 'http://gzhtest.xianlubang.com/api/'
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
  let t = '1000' + timestamp + localStorage.getItem('token') + '2d4481133c95a64ae9f9583a4b2d3bf5'
  data.token = localStorage.getItem('token')
  data.timeline = timestamp
  data.sign = md5(t)
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
