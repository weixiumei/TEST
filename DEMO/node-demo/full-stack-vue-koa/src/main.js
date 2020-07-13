// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 全局引入
// import Vant from 'vant'
// import 'vant/lib/index.css'
// Vue.use(Vant)

// 部分引入 -- babel-plugin-import
import {Button, Row, Col, Swipe, SwipeItem, Lazyload, Tabbar, TabbarItem} from 'vant'
Vue.use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem).use(Lazyload).use(Tabbar).use(TabbarItem)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
