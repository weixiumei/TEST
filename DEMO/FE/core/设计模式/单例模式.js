function Universe(){
  var instance=this; //缓存this
  this.xx="xx";
  console.log(1)
  Universe=function(){ //重写此构造函数
    instance.yy='yy'
    console.log(2)
    return instance; 
  }
}

var uni=new Universe();
console.log(uni)
var uni2=new Universe();
uni===uni2; //true
console.log(uni2)
