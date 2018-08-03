// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import vuex from 'vuex'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import store from './store/store.js'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/style/iconfont/iconfont.css'
import './assets/style/resetElementUI.css'
//import './http/http.js'   http拦截
Vue.use(ElementUI)
Vue.prototype.$http = axios
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
