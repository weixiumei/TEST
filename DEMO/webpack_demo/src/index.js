import _ from 'lodash';
import './style.css';

function component() {
  let element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

/**
* deep clone
* @param  {[type]} parent object 需要进行克隆的对象
* @return {[type]}        深克隆后的对象
*/
const getRegExp = re => {
  var flags = '';
  if (re.global) flags += 'g';
  if (re.ignoreCase) flags += 'i';
  if (re.multiline) flags += 'm';
  return flags;
};
const isType = (obj, type) => {
  if (typeof obj !== 'object') return false;
  const typeString = Object.prototype.toString.call(obj);
  let flag;
  switch (type) {
    case 'Array':
      flag = typeString === '[object Array]';
      break;
    case 'Date':
      flag = typeString === '[object Date]';
      break;
    case 'RegExp':
      flag = typeString === '[object RegExp]';
      break;
    default:
      flag = false;
  }
  return flag;
};

const clone = parent => {
  // 维护两个储存循环引用的数组
  const parents = [];
  const children = [];
  const _clone = parent => {
    console.log('parent', parent)
    if (parent === null) return null;
    if (typeof parent !== 'object') {
      return parent;
    }
    let child, proto;
    if (isType(parent, 'Array')) {
      // 对数组做特殊处理
      child = [];
    } else if (isType(parent, 'RegExp')) {
      // 对正则对象做特殊处理
      child = new RegExp(parent.source, getRegExp(parent));
      if (parent.lastIndex) child.lastIndex = parent.lastIndex;
    } else if (isType(parent, 'Date')) {
      // 对Date对象做特殊处理
      child = new Date(parent.getTime());
    } else {
      // 处理对象原型
      // = parent.__proto__
      proto = Object.getPrototypeOf(parent);
      // 利用Object.create切断原型链，相当于浅拷贝
      child = Object.create(proto);
      console.log('proto-child', proto, child)
    }

    // 处理循环引用
    const index = parents.indexOf(parent);
    console.log('index', index, parent)
    if (index != -1) {
      // 如果父数组存在本对象,说明之前已经被引用过,直接返回此对象
      return children[index];
    }

    parents.push(parent);
    children.push(child);
    console.log('parents',parents)
    console.log('children',children)
    console.log('#####################')
    for (let i in parent) {
      // 递归
      console.log('####递归',i, parent[i])
      child[i] = _clone(parent[i]);
    }
    console.log(child)
    return child;
  };
  return _clone(parent);
};

function Father(){
}
Father.prototype.name = 'wei'

function Son(){
}
// 继承
Son.prototype = new Father()
Son.prototype.say = function(){
  console.log('hi');
}
Son.prototype.say1 = function(){
  console.log('hi');
}
Son.prototype.ok = {
  aa:11,
  bb:11
}
// Son.prototype.ok = null
// Son.prototype.un = undefined
// Son.prototype.array_num = {
//   aaa:[1,2]
// }
var aa = new Son()
// clone(aa)

//################
var oldObj = {
  a:1,
  a1:{a:1},
  bb:['wei','xiu'],
  cc:function(){
    alert('11')
  }
}
// var newObj1 = oldObj
// 1.他无法实现对函数 、RegExp等特殊对象的克隆
// 2.会抛弃对象的constructor,所有的构造函数会指向Object
// 3.对象有循环引用,会报错
// var newObj2 = JSON.parse(JSON.stringify(oldObj))
// var newObj3 = clone(oldObj)
// console.log(newObj1)
// console.log(newObj2)
// console.log(newObj3)
// console.log('-------------')
// oldObj.aa = 2
// console.log(newObj1)
// console.log(newObj2)
// console.log(newObj3)

//################

var func=new function(){
  this.a="func"
}
var myfunc=function(x){
  var a="myfunc";
  console.log(this.a);
  console.log(x);
}
// myfunc.call(func,"var");    //弹出func和var

//################

function Animal(name, age) {
  this.name = name;
  this.age = age;
  this.showName = function() {
    console.log(this.name+' age is '+age);
  };
}
function Cat(name, age) {
  //call必须是object
  Animal.call(this, name, age);
}
Cat.prototype = new Animal();
function Dog(name, age) {
  //apply必须是array, 可以直接将当前函数的arguments对象作为apply的第二个参数传进去
  // Animal.apply(this, arguments);
  Animal.apply(this, [name, age]);
}
Dog.prototype = new Animal();
var cat = new Cat("Black Cat",12); 
var dog = new Dog("Black Dog", 13); 
// cat.showName();  //Black Cat age is 12
// dog.showName();  //Black Dog age is 13

//################

var foo = ( function() {
  // 是不污染全局对象，变量一直存在
  var secret = 'secret';
  // “闭包”内的函数可以访问 secret 变量，而 secret 变量对于外部却是隐藏的
  return {
    get_secret: function () {
      // 通过定义的接口来访问 secret
      return secret;
    },
    new_secret: function ( new_secret ) {
      // 通过定义的接口来修改 secret
      secret = new_secret;
    }
  };
} () );

foo.get_secret (); // 得到 'secret'
foo.secret; // Type error，访问不能
foo.new_secret ('a new secret'); // 通过函数接口，我们访问并修改了 secret 变量
foo.get_secret (); // 得到 'a new secret'

//################

var a = [];
for (var i = 0; i < 10; i++) {
  var c = i;
  a[i] = function () {
    console.log(c);
  };
}
a[6](); // 9

var a = [];
for (var i = 0; i < 10; i++) {
  let c = i;
  a[i] = function () {
    console.log(c);
  };
}
a[6](); // 6
console.log(a)