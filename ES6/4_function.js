/**
 * 1. 指定函数默认值：（一般指定尾参数，否则只有在对应的位置上传入 undefined 来触发默认）
 *    注意，参数变量是默认声明的，会有暂时性死区的可能，也不能用null来触发默认
 */
function log(x, y = 'world'){
    console.log(x, y);
}
log("hello");

/**
 * 指定了默认值后，函数参数的length值时不包含这个函数的(arguments还是传入几个显示几个)
 */
function testLength(x, y=10){
    console.log(arguments.length);
};
console.log(testLength.length); //打印1
testLength(1,2);                //打印打印2

/**
 *  参数变量是默认声明的，由此可知：
 *  参数会在函数中形成自己的作用域（在参数列表中）
 *  参数不能调用函数中还未定义的变量，换句话说，参数列表不能访问函数内部作用域
 */

function own(x, y = x){
    console.log(y);
}
own(2);                         //打印2

function own2(y = x){//在这里找不到x；假如全局中有x，会被找到
    let x = 2;
    console.log(y);
}                           
own2();                        //语法错误

/**
 * 2. rest (...)
 *    rest参数，可以用来替换arguments， 注意，使用的时候只能作为最后一参数定义
 *    函数调用的时候，将数组解成参数列表
 */
function testRest(arr, ...items){
    //将arr和items合并
    return arr.concat([].slice.call(items, 0));
}
console.log(testRest([1,2,3], 4,5,6));

//应用
Math.max(...[5, 10, 4]);
var arr1 = [1, 2, 3];
var arr2 = [4, 5, 6];
var arr3 = [...arr1, ...arr2];//[1, 2, 3, 4, 5, 6]
//类数组转化为真正的数组
var nodeList = document.querySelectorAll('div');
var array = [...nodeList];
//字符串应用
[...'hello']                   //['h', 'e'. 'l', 'l', 'o']
//Generator函数
var go = function*(){
  yield 1;
  yield 2;
  yield 3;
};

[...go()] // [1, 2, 3]

/**
 * 3.name属性
 * es5 中，将匿名函数赋值给变量，不会拿到变量名 fn.name;
 * es6 中可以拿到
 */
var f = function () {};
// ES5
f.name // ""
// ES6
f.name // "f"


/**
 * 4. 箭头函数
 *    本质是自己没有this，在生成时绑定了外层的函数作为对应的"this"
 *    因为没有this，所以用call，apply改变this指向就不可能
 */
var name = "jjj";
function L1(name){
    this.name = name;
    setTimeout(() => {
        setTimeout(function() {
            console.log(this.name);
        }, 1000);
    }, 1000);
}
new L1("hhhh");  //jjj

function L2(name){
    this.name = name;
    setTimeout(() => {
        setTimeout(() => {
            console.log(this.name);
        }, 1000);
    }, 1000);
}
new L2("hhhh");  //hhh

function L3(name){
    this.name = name;
    setTimeout(function() {
        setTimeout(() => {
            console.log(this.name);
        }, 1000);
    }, 1000);
}
new L3("hhhh");  //jjj

/**
 *  衍生问题：
 *  使用this的地方才是调用时生效，函数声明定义的时候，会绑定外层作用域
 */

function L4(name){
    this.name = name;
    setTimeout(function() {
        console.log(this.name);
    }, 1000);
}
new L4("hhhh");  //jjj

function L5(name){
    this.name = name;
    setTimeout(function() {
        console.log(name);
    }, 1000);
}
new L5("hhhh");  //hhh

/**
 * 尾调用，尾递归，和函数柯里化
 * 尾调用：在函数的最后一步调用另一个函数（感觉就是对输入进行处理）
 * 尾递归：尾调用的递归函数（为什么不用循环？）
 * 函数柯里化：将多参数转为单参数函数
 * 尾调用优化只在严格模式下生效
 */
function tco(f) {
  var value;
  var active = false;
  var accumulated = [];

  return function() {
    accumulated.push(arguments);debugger;
    if (!active) {
      active = true;
      while (accumulated.length) {
        value = f.apply(this, accumulated.shift());
      }
      active = false;
      return value;
    }
  };
}

var sum = tco(function(x, y) {
    debugger;
  if (y > 0) {
    return sum(x + 1, y - 1)
  }
  else {
    return x
  }
});
debugger;
sum(1, 100000)