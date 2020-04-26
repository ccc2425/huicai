// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// import Vconsole from 'vconsole';
// const vConsole =new Vconsole();
// Vue.use(vConsole);

import myCharts from './assets/script/myCharts.js'
Vue.use(myCharts)

import 'lib-flexible/flexible.js'

const { $ } = require('./axios')
Vue.prototype.$ = $

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
