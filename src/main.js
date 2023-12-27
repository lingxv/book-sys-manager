import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/global.css'

// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 引入axios、配置axios访问路径的前缀、访问别名
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:9000/';
Vue.prototype.$axios = axios; // this.$axios


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
