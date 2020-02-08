// import { resolve } from "../promise/promise/promise-es5"

// console.log('1');

// setTimeout(function() {
//     console.log('2');
// //     process.nextTick(function() {
// //         console.log('3');
// //     })
//     new Promise(function(resolve) {
//         console.log('4');
//         resolve();
//     }).then(function() {
//         console.log('5')
//     })
// })
// // process.nextTick(function() {
// //     console.log('6');
// // })
// new Promise(function(resolve) {
//     console.log('7');
//     resolve();
// }).then(function() {
//     console.log('8')
// })

// setTimeout(function() {
//     console.log('9');
// //     process.nextTick(function() {
// //         console.log('10');
// //     })
//     new Promise(function(resolve) {
//         console.log('11');
//         resolve();
//     }).then(function() {
//         console.log('12')
//     })
// })
// // 1 7 6 8 2 4 9 11 3 5 10 12
// // 1 7 8 2 4 9 11 5 12



// console.log(1);
// setTimeout(function(){
//   console.log(2);
// },100)
// new Promise(function(resolve,reject){
//   console.log(3);
//   resolve();
// }).then(function(){
//   setTimeout(function(){
//     console.log(4);
//   },1)
// })

function* foo(x) {
  yield x + 1;
  // setTimeout(function(x){
  //   yield x + 1;
  // })
}

var arr = [1,2,3,4,5]
for(var i=0;i<arr.length;i++){
  var result = foo(arr[i]) // foo {<suspended>}
  console.log(result.next())
}

// const result = foo(0) // foo {<suspended>}
// result.next();  // {value: 1, done: false}
// result.next();  // {value: 2, done: false}
// result.next();  // {value: 3, done: true}
// result.next();  //{value: undefined, done: true}
