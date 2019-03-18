// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/reset.css'
import './assets/iconfont/iconfont.css'
import store from './store/state.js'




// 无线滚动插件
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)

//全局过滤器
Vue.filter('mycurrency',function(arg1,sym){
    return sym + parseInt(arg1).toFixed(2);
})

//bus总线用户  非父子组件之间的通讯
Vue.prototype.bus = new Vue();

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
