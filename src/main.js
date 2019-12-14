import Vue from 'vue'
import Antd from 'ant-design-vue';
import App from './App.vue'
import 'ant-design-vue/dist/antd.css';
import SvgIcon from 'vue-svgicon'
import axios from 'axios'
import VueAxios from 'vue-axios'
var VueScrollTo = require('vue-scrollto');
 
Vue.use(VueScrollTo)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.use(Antd);
Vue.use(SvgIcon, {
  tagName: 'svgicon',
  isOriginalDefault: true,
})

Vue.use(VueScrollTo, {
  container: "body",
  duration: 500,
  easing: "ease",
  offset: 0,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
})

new Vue({
  render: h => h(App),
}).$mount('#app')
