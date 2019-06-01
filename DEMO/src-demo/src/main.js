// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import 'common/style/common.less'
import 'common/style/base.css'
import 'common/style/reset.css'
import VueI18n from 'vue-i18n'

Vue.config.productionTip = false
Vue.use(VueI18n)

// 国际化
const i18n = new VueI18n({
  locale: 'zh', // 语言标识
  messages: {
    'zh': require('@/common/lang/zh'),
    'en': require('@/common/lang/en')
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
})