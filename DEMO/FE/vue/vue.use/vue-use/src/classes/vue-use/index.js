import Vue from 'vue'
import { Plugin1, Plugin2 } from './plugins'
console.log('====Vue.use====')
Vue.use(Plugin1, '参数1', '参数2')
Vue.use(Plugin2, '参数A', '参数B')
