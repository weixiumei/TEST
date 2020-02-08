console.log('');console.log('');console.log('');




console.log(0.1+0.2)

console.log(9999999999999999==10000000000000001)

console.log(parseFloat(0.9))
console.log(parseFloat(9999999999999999.9) )
console.log(parseInt("9999999999999999"))
console.log(parseFloat(9.999999999999999))

var num = 1.335;
console.log(num.toFixed(2));



//浮点数转换为整数
function toInt(num){
  var rel = {}
  var str = num<0?-num+'':num+''
  var pos = str.indexOf('.')
  var len = str.substr(pos+1).length
  var times = Math.pow(10, len)
  rel.times = times
  rel.num = num
  return rel
}
// eg. 0.1+0.25
var d1 = toInt(0.1)
var d2 = toInt(0.23)
var max = d1.times>d2.times?d1.times:d2.times
// 0.1+0.25 => (d1.num*max+d2*max)/max
console.log((d1.num*max+d2.num*max)/max)


function toFixed(num, s){
  var times = Math.pow(10, s)
  var des = num*times+0.5
  var des = parseInt(des, 10)/times
  return des + ''
}



console.log(' ');console.log(' ');console.log(' ');
