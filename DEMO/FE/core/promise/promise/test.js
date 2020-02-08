// import Promise from './promise-es6.js'
// const Promise = require('./promise_min.js')

new Promise((resolve, reject) => {
  // console.log('Promise-1')
  resolve({data:123})
}).then((value)=>{
  console.log('1-then-out', value)
  // return new Promise((resolve,reject)=>{
  //   resolve({data:'test'})
  // }).then((value)=>{
  //   console.log('--1-then-in--', value)
  //   return {data:123}
  // })
  return {data:456}
}).then((value)=>{
  console.log('2-then', value)
  return {data:789}
})
