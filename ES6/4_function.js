/***
 * 箭头函数和普通函数的区别：
 */
//1.this绑定，绑定为定义时的上下文
(function () {
    let b = 100;
    function A() {
        console.log(b);
    }
    
    let a = () => {
        console.log(b);
    }
    
    let obj = {b:1};
    
    A.call(obj);
    a.call(obj);
})();

name = "global";
var a = {
    name : "hahaha",
    aa:100,
    getName : () => {
        console.log(this);
    }
};
var obj = {name:"aaa"};
a.getName.call(obj);