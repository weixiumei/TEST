// 引入(必须用结构赋值，一一对应)
import $ from 'jquery'

import { foo, bar, arr } from './module1'

import {foo2, bar2} from './module2'

import module3 from './module3'

// $(()=>{
//   $('body').css('background', 'green')
// })

$.ready = function(){
  $('body').css('background', 'green')
}

foo()
bar()
console.log(arr)

foo2()
bar2()

module3.foo()
console.log(module3.a)