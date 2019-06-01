// 定义一个名为 button-counter 的新组件
Vue.component('button-counter', {
  //  组件的data必须是一个函数
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})