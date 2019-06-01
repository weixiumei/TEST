import Vue from 'vue'
import Router from 'vue-router'
import { getUrlParameter } from '@/common/util/common.js'

Vue.use(Router)

let val = getUrlParameter('menuId') ? getUrlParameter('menuId') : 'index'
let redirectUrl
switch (val) {
  case '':
    redirectUrl = '/index'
    break
}

export default new Router({
  routes: [
    {
      path: '',
      component: resolve => require(['@/main/main.vue'], resolve),
      children: [{
        path: '/index',
        name: 'index',
        component: resolve => require(['@/views/index/index.vue'], resolve),
        meta: {
          title: '首页'
        }
      }]
    },
    {
      path: '/',
      redirect: redirectUrl
    }
  ]
})