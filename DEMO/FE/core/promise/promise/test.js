// ctrl+alt+n
// import Promise from './promise-es6.js'
const Promise = require('./promise_min.js')

new Promise((resolve, reject) => {
  // console.log('Promise-1')
  resolve({data:111})
  console.log('resolve的后面')
}).then((value)=>{
  console.log('1-then-success', value)
  return new Promise((resolve,reject)=>{
    resolve({data:'test'})
  }).then((value)=>{
    console.log('--1-then--in-then--', value)
    return {data:123}
  }).then(()=>{
    console.log('--1-then--in-then--then--', value)
    return {data:444}
  })
},(value) => {
}).then((value)=>{
  console.log('2-then-succ', value)
  return {data:789}
},(value)=>{
  console.log('2-then-fail', value)
  return {data:789}
})

setTimeout(()=>{
  console.log('timeout')
})