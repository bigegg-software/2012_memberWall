import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './utils/lib-flexible' // 根据屏幕宽度，自动设置html的font-size

import scroll from 'vue-seamless-scroll'//无缝滚动
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.use(Antd)

import axios from 'axios'
Vue.prototype.$axios = axios
Vue.use(scroll)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
