import Vue from 'vue'
import Router from 'vue-router'
var homepage=resolve => require(['@/pages/homepage'],resolve);
var myshoplist=resolve => require(['@/pages/myshoplist'],resolve);
var address=resolve => require(['@/pages/address'],resolve);
var orderconfirm=resolve => require(['@/pages/orderconfirm'],resolve);
var ordersucess=resolve => require(['@/pages/ordersucess'],resolve)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: homepage
    },
    {
      path: '/goods',
      name: 'homepage',
      component: homepage
    },
    {
      path: '/myshoplist',
      name: 'myshoplist',
      component: myshoplist
    },
    {
      path:'/address',
      name:'address',
      component:address
    },
    {
      path:'/orderconfirm',
      name:'orderconfirm',
      component:orderconfirm
    },
    {
      path:'/ordersucess',
      name:'ordersucess',
      component:ordersucess
    }
  ],
  scrollBehavior(to,form,savedPosition){
      //每个导航初始化滚动条
    return {x : 0, y :0 }
  }
})
