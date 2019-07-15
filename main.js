import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

import iconfont from './static/iconfont/iconfont.css'

import jsencrypt from 'jsencrypt'
// 
// // import {uniBadge} from './components/uni-ui/uni-badge/uni-badge.vue'
// // Vue.prototype.$security = request('./static/js/security.js')
import VueSocketio from 'vue-socket.io';
// // import security from 
Vue.prototype.$crypto = require('crypto-js')

Vue.use(new VueSocketio({                                 
    connection: 'ws://127.0.0.1:5000',
  }))
const app = new Vue({
    ...App
})
app.$mount()
