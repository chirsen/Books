/*闭包
// 1.函数的重载
function addMethod(obj, name, fn){
	var old = obj[name];
	obj[name] = function(){
		console.log("====");
		if(fn.length == arguments.length){
			return fn.apply(this, arguments);
		}else if(typeof old == 'function'){
			return old.apply(this, arguments);
		}
	}
}
var najia = {};
addMethod(najia, "wa", function(){console.log("0");});
addMethod(najia, "wa", function(a){console.log("1")});
addMethod(najia, "wa", function(a, b){console.log("2")});

najia["wa"]();
najia["wa"](1);
najia["wa"](1, 2);


// 2.偏函数|柯里化

// 开头的函数缺省
Function.prototype.curry = function(){
	var fn = this, args = Array.prototype.slice.call(arguments);
	return function(){
		return fn.apply(this, args.concat(Array.prototype.slice.call(arguments)));
	};
}
var add = function(a, b){
	return a + b;
}.curry(10);
console.log(add(100));

// 任意一个参数缺省
Function.prototype.partial = function(){
	//前后两个this不同
	var fn = this, args = Array.prototype.slice.call(arguments);
	return function(){
		var arg = 0;
		for(var i = 0; i < args.length && i < arguments.length; i++){
			if(args[i] === undefined){
				args[i] = arguments[arg++];
			}
		}
		return fn.apply(this, args);
	};
}

var delay = setTimeout.partial(undefined, 1000);
delay(function(){
	console.log("1000ms");
});


// 3.即时函数
// 创建独立作用域

document.addEventListener("click", (function(){
	var click = 0;
	return function(){
		alert("click number: "+click);
	}
})(), false)

// 限制作用域名称/简洁名称
(function(v){
	v.mm = "xxx";
	v.aa = "xxx";
	v.bb = "xxx";
	v.cc = "xxx";
})(xxx.yy.aa)
*/