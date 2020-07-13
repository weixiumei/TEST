import Vue from 'vue'
import Router from 'vue-router'
import main from '@/views/main'
import home from '@/views/home'
import custom from '@/views/custom'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      name: 'main',
      component: main,
      children: [
        {path: '/', name: '主页', component: home},
        {path: '/custom', name: '自定义', component: custom}
      ]
    }
  ]
})
