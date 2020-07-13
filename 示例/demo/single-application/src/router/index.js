import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
// import HelloWorld from '@/components/HelloWorld'
import title from '@/components/title'
import title1 from '@/components/title1'
import title2 from '@/components/title2'
// import foo from '@/components/foo'

Vue.use(Router)

export default new Router({
  mode: 'history', // hash/history
  routes: [
    {
      path: '/',
      name: 'index',
      components: {
        default: index,
        title: title,
        title1: title1
      },
      children: [
        {
          path: '/title',
          name: '标题',
          component: title
        }, {
          path: '/title1',
          name: '标题1',
          component: title1
        }
      ]
    }, {
      path: '/title2',
      name: '标题2',
      component: title2
    }
  ]
})
