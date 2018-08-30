// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import store from './vuex/store'
import router from './router'


import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(Mint)

//import 'muse-ui/dist/theme-carbon.css' // 使用 carbon 主题
//使用muse-ui
// import MuseUI from 'muse-ui' 
// import 'muse-ui/dist/muse-ui.css'
// Vue.use(MuseUI)


	


// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts 

Vue.config.productionTip
require('echarts/theme/macarons');

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
