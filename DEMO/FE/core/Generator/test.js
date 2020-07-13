async function test() {
  console.log(0)
  await 1
  console.log('a')
  await async2()
  console.log('b')
  await 'c'
  console.log('c')
  return 3
}
async function async2() {
  console.log('async2 end') //2
}
new Promise(function(resolve){
  resolve()
}).then(function(){
  console.log('then1')
}).then(function(){
  console.log('then2')
}).then(function(){
  console.log('then3')
}).then(function(){
  console.log('then4')
})

test().then(function(d){
  console.log('test结束 =', d)
})

// new Promise(function(resolve){
//   resolve()
// }).then(function(){
//   console.log('then11')
// }).then(function(){
//   console.log('then22')
// }).then(function(){
//   console.log('then33')
// })

setTimeout(function(){
  console.log('timemout')
})
// function run(fn) {
//   var gen = fn();

//   function next(err, data) {
//     var result = gen.next(data);
//     if (result.done) return;
//     result.value(next);
//   }
//   next();
// }

// function *test2(){
//   yield 1
//   yield 2
// }

// run(test2);
