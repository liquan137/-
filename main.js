import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

import iconfont from './static/iconfont/iconfont.css'

import jsencrypt from './static/js/jsencrypt.js'

// import {uniBadge} from './components/uni-ui/uni-badge/uni-badge.vue'

import VueSocketio from 'vue-socket.io';

import store from 'store.js'

Vue.use(new VueSocketio({                                 
    debug: true,
    connection: 'ws://127.0.0.1:5000',
  }))
const app = new Vue({
    ...App
})
app.$mount()
