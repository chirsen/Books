/**
 * let （code 1）
 * 1.块级作用域内有效
 * 2.不会变量提升
 * 3.暂时性死区（跟2 相似， 如果块级作用域内存在与外部同名变量， 该外部同名变量在块级作用域内，变量声明之前， 无效）
 * 4.var，let, const在同一作用域内，不允许重复声明同一变量名
 * 
 * const （code 2）
 * 同let
 * 5.变量不可变
 * 6.当声明的变量为对象时，保证不变的是对象引用的地址不变，值可以更改
 * 
 * 块级作用域 （code 3）
 *  es5规定，函数只能在顶层作用域和函数作用域中声明
 *  es6规定，允许在块级作用域中声明函数，但是只在声明的作用域中有效（那还要他干嘛）（一定要用大括号）
 * 
 */

/*
//code 1_3
let temp = 0;
{
    console.log(temp); //报错（在没有下面语句时，是可以访问temp的）

    let temp = 2;
}



//code 2_6
const PI = 3.14;
const obj = {};

PI = 3.14159; //报错
obj.name = "hello";// 不报错
obj = {}; // 报错

*/

//code 3
//es5：i'm inside
function f() { console.log("i'm outer"); }
(function () {
    if (false) {
        function f() { console.log("i'm inside"); }
    }
    f();
} ());