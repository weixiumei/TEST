let msg = 'module1'
function far(){
  console.log(msg)
}
let arr = [1,2,7,3,4,22]
// 暴露一个对象
module.exports = {
  far, 
  arr
}