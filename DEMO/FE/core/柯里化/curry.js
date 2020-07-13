

// function curry(fn){
//   var args=Array.prototype.slice.call(arguments,1);
//   console.log('args=', args)
//   return function(){
//     var innerArgs=Array.prototype.slice.call(arguments);
//     console.log('innerArgs=',innerArgs)
//     var finalArgs=args.concat(innerArgs);
//     console.log('finalArgs=', finalArgs)
//     return fn.apply(null,finalArgs);
//   };
// }
// function add(x=0, y=0, z=0){
//   return x + y + z
// }

// // console.log(curry(add,1,2,3)())
// console.log('==================')
// console.log(curry(add)(1,2))


// var addEvent = (function(){
//   if (window.addEventListener) {
//       return function(el, sType, fn, capture) {
//           el.addEventListener(sType, function(e) {
//               fn.call(el, e);
//           }, (capture));
//       };
//   } else if (window.attachEvent) {
//       return function(el, sType, fn, capture) {
//           el.attachEvent("on" + sType, function(e) {
//               fn.call(el, e);
//           });
//       };
//   }
// })();

// addEvent('span', 'click', function () {}, false)
// addEvent('div', 'click', function () {}, false)
// addEvent('p', 'click', function () {}, false)
// addEvent('div', 'dblclick', function () {}, false)


var curry1 = function (fn) {
	let allParam1 = []
	return function () {
		if (arguments.length === 0) {
			fn.call(null, allParam1)
		} else {
			allParam1 = allParam1.concat([].slice.call(arguments))
		}
	}
}

var currentCurry = curry1(function(allParam1){
	console.log(allParam1)
})
currentCurry(2)
currentCurry(3)
currentCurry(1)
currentCurry(3)
currentCurry()