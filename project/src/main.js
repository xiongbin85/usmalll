// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
//重置样式
import "./assets/css/reset.css"
//共公组件
import commonComponent from "./components"
for (var i in commonComponent) {
  Vue.component(i, commonComponent[i])
}
//过滤器
import Filters from "./filters"
for (var i in Filters) {
  Vue.filter(i, Filters[i])
}
//vuex
import store from "./store"
//element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


// Vue.prototype.$imgPre = "http://localhost:3000"
Vue.prototype.$imgPre = ""
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
