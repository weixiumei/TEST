var myPow = function(x, n){
  var r = 1
  for(var i=0;i<n;i++){
    r = r * x
  }
  console.log(r)
  return r
}
myPow(10, 5)