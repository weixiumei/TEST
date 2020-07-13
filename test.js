//  //获取儿子都被选中的父节点
// var treeMapAll = {
// 	"999": {
// 		Id: "-1",
// 		label: "999",
// 		children: ["99", "9"]
// 	},
// 	"99": {
// 		"pId": "999",
// 		"label": "99",
// 		"children": []
// 	},
// 	"9": {
// 		"pId": "999",
// 		"label": "9",
// 		"children": ["1", "2"]
// 	},
// 	"1": {
// 		"pId": "9",
// 		"label": "1",
// 		"children": []
// 	},
// 	"2": {
// 		"pId": "9",
// 		"label": "2",
// 		"children": []
// 	},
// 	"888": {
// 		pId: "-1",
// 		label: "888",
// 		children: ["88", "8"]
// 	},
// 	"88": {
// 		"pId": "888",
// 		"label": "88",
// 		"children": []
// 	},
// 	"8": {
// 		"pId": "888",
// 		"label": "8",
// 		"children": []
// 	},
// 	"-1": {
// 		"pId": null,
// 		"label": null,
// 		"children": []
// 	}
// }
// function miniCheckedTreeFilterGetParent(checkedKeys){
// 	let to_add = {};
// 	let parents = {};
// 	let all = true;
// 	function up(checkedKeys){
// 		//获取上一层父节点
// 		//to_add = {pid:[cid1,cid2...],}
// 		var checkedKeys  = Array.from(new Set(checkedKeys));
// 		for(var i=0;i<checkedKeys.length;i++){
// 			if (!treeMapAll[checkedKeys[i]]) continue;
// 			let pId = treeMapAll[checkedKeys[i]]['pId'];
// 			if(!pId) continue;
// 			if(!!to_add[pId]){
// 				to_add[pId].push(checkedKeys[i]);
// 				to_add[pId] = Array.from(new Set(to_add[pId]));
// 			}else{
// 				to_add[pId] = [checkedKeys[i]];
// 			}
// 			all = true;
// 		}
// 		console.log('to_add=', to_add)
// 		// 遍历父节点
// 		// 如果与MapAll的子节点一样多，则表明这次全部选中了，可以把节点也放入 把子节点删了
// 		// 子节点先不删，因为有可能这个父节点是不可被选中的
// 		for(var k in to_add){
// 			if(to_add[k].length == treeMapAll[k].children.length){
// 				for(var i = 0 ; i < to_add[k].length ; i++){
// 					checkedKeys.splice(checkedKeys.findIndex(item => item === to_add[k][i]), 1)
// 				}
// 				checkedKeys.push(k * 1)
// 				parents[k] = true;
// 			}
// 		}
// 		return checkedKeys;
// 	}


// 	while(all){
// 		let len1 = checkedKeys.length
// 		checkedKeys = up(checkedKeys)
// 		checkedKeys = Array.from(new Set(checkedKeys));
// 		let len2 = checkedKeys.length

// 		if(len1 === len2){
// 			break;
// 		}
// 	}

// 	let _parentsKeys = Object.keys(parents);
// 	_parentsKeys = _parentsKeys.map(x => x * 1) 
	
// 	return {
// 		'parentKeys':_parentsKeys,
// 		// 'checkedKeys':checkedKeys
// 	};
// }

// // console.log(miniCheckedTreeFilterGetParent([1, 2, 888]))
// // console.log(miniCheckedTreeFilterGetParent([1, 2, 888]))

// console.log(test1([999, 99, 9, 1, 2, 888]))


// function test1(checkedKey3){
// 	var parentNode = [], terminalNode = []
// 	// 保存最底层
// 	for (var i=0;i<checkedKey3.length;i++) {
// 		var children = treeMapAll[checkedKey3[i]].children
// 		// console.log(children)
// 		if (!children||children.length == 0){
// 			terminalNode.push(checkedKey3[i]);
// 		} else {
// 			parentNode.push(checkedKey3[i]);
// 		}
// 	}
// 	console.log(parentNode, terminalNode)
// 	return
// }


// // // console.log(optimization([3515, 3516, 11, 22]))
// // function optimization(checkedKeys2){
// // 	var self = this
// // 	var _parentsKeys2 = []
// // 	var testArr = []
// // 	pushPid(checkedKeys2)
// // 	function pushPid(checkedKeys2){
// // 		for (var i=0;i<checkedKeys2.length;i++) {
// // 			if (treeMapAll[checkedKeys2[i]].pId && !_parentsKeys2.includes(treeMapAll[checkedKeys2[i]].pId*1)) {
// // 				// console.log('2222', treeMapAll[checkedKeys2[i]].pId, treeMapAll[treeMapAll[checkedKeys2[i]].pId].children, Array.from(new Set(checkedKeys2.concat(_parentsKeys2))))
// // 				var mix = treeMapAll[treeMapAll[checkedKeys2[i]].pId].children.filter(function(v){
// // 					// return checkedKeys2.includes(v * 1)
// // 					console.log('***', Array.from(new Set(checkedKeys2.concat(_parentsKeys2))), v)
// // 					return Array.from(new Set(checkedKeys2.concat(_parentsKeys2))).includes(v*1)
// // 				})
// // 				console.log('mix=',mix)
// // 				if (mix.length === treeMapAll[treeMapAll[checkedKeys2[i]].pId].children.length) {
// // 					// _parentsKeys2 = _parentsKeys2.concat(treeMapAll[checkedKeys2[i]].pId*1)
// // 					if(!_parentsKeys2.includes(treeMapAll[checkedKeys2[i]].pId*1)){
// // 						_parentsKeys2.push(treeMapAll[checkedKeys2[i]].pId*1)
// // 					}
// // 				}
// // 			}
// // 		}
// // 		// _parentsKeys2 = Array.from(new Set(checkedKeys2))
// // 		if (testArr.length!==_parentsKeys2.length) {
// // 			testArr = JSON.parse(JSON.stringify(_parentsKeys2))
// // 			pushPid(testArr)
// // 		}
// // 	}
// // 	// for(var i=0;i<checkedKeys2.length;i++){
// // 	// 	// 含有children，并且children都在checkedKeys2里
// // 	// 	// if (treeMapAll[checkedKeys2[i]].children&&treeMapAll[checkedKeys2[i]].children.length>0 && _parentsKeys2.includes(checkedKeys2[i])) {
// // 	// 	// 	var mix = treeMapAll[checkedKeys2[i]].children.filter(function(v){
// // 	// 	// 		return checkedKeys2.includes(v*1)
// // 	// 	// 	})
// // 	// 	// 	if (mix.length === treeMapAll[checkedKeys2[i]].children.length) {
// // 	// 	// 		_parentsKeys2 = _parentsKeys2.concat(checkedKeys2[i])
// // 	// 	// 	}
// // 	// 	// } else 
// // 	// 	if (_parentsKeys2.includes(treeMapAll[checkedKeys2[i]].pId)){
// // 	// 		var mix = treeMapAll[treeMapAll[checkedKeys2[i]].pId].children.filter(function(v){
// // 	// 			return checkedKeys2.includes(v*1)
// // 	// 		})
// // 	// 		if (mix.length === treeMapAll[treeMapAll[checkedKeys2[i]].pId].children.length) {
// // 	// 			_parentsKeys2 = _parentsKeys2.concat(treeMapAll[checkedKeys2[i]].pId)
// // 	// 		}
// // 	// 	}
// // 	// 	// 找到checkedKeys2[i]的父节点，父节点下的children都在checkedKeys2里
// // 	// 	// checkedKeys2[i]的父节点在_parentsKeys2里不重复执行
// // 	// 	// if (treeMapAll[checkedKeys2[i]].pId) {
// // 	// 	// 	var mix = treeMapAll[treeMapAll[checkedKeys2[i]].pId].children.filter(function(v){
// // 	// 	// 		return checkedKeys2.includes(v*1)
// // 	// 	// 	})
// // 	// 	// 	if (mix.length === treeMapAll[treeMapAll[checkedKeys2[i]].pId].children.length) {
// // 	// 	// 		_parentsKeys2 = _parentsKeys2.concat(checkedKeys2[i])
// // 	// 	// 	}
// // 	// 	// }
// // 	// 	// up(treeMapAll[checkedKeys2[i]].pId, checkedKeys2, _parentsKeys2)
// // 	// }
// // 	// pId是否是全选全选就放入_parentsKeys2
// // 	// function up(pId, checkedKeys2){
// // 	// 	// 找到checkedKeys2[i]的父节点，父节点下的children都在checkedKeys2里
// // 	// 	// checkedKeys2[i]的父节点在_parentsKeys2里不重复执行
// // 	// 	if (pId && !_parentsKeys2.includes(pId*1)) {
// // 	// 		var mix = treeMapAll[pId].children.filter(function(v){
// // 	// 			return Array.from(new Set(checkedKeys2.concat(_parentsKeys2))).includes(v*1)
// // 	// 		})
// // 	// 		if (mix.length>0 && mix.length === treeMapAll[pId].children.length) {
// // 	// 			_parentsKeys2 = _parentsKeys2.concat(pId*1)
// // 	// 			up(treeMapAll[pId].pId, checkedKeys2)
// // 	// 		}
// // 	// 	}
// // 	// }
// // 	return {
// // 		'parentKeys':Array.from(new Set(_parentsKeys2)),
// // 		// 'checkedKeys':checkedKeys
// // 	};
// // }



var hh = '1'
function aa(){
	hh = '123'
	return function a(){
		console.log(hh)
	}
}
hh = '2'
aa()()