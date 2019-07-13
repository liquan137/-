// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iconfont from './assets/iconfont/iconfont.css'
import jsencrypt from 'jsencrypt'

import VueSocketio from 'vue-socket.io'
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(iconfont)
Vue.use(Vant)
Vue.prototype.$crypto = require('crypto-js')
Vue.config.productionTip = false

Vue.use(new VueSocketio({
  connection: 'ws://127.0.0.1:5000'
}))
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
