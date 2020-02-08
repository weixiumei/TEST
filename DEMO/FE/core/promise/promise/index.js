// ctrl+alt+n
new Promise(function(resolve, reject){
  resolve(1)
}).then(function(value){
  console.log('value=', value)
}, function(reason){
  console.log('reason=',reason)
})
