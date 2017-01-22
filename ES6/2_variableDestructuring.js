/**
 * 变量的解构赋值
 * 1. 数组(code_1)
 *      形如：var/let/const [a, b, c] = [1, [21, 22], new Set([31, 32, 33])];
 *      等式右边具有Iterator接口就行
 * 
 * 2.对象的解构
 *      形如：var/let/const {bar , foo:a} = {bar:100, foo:1000};
 *      foo 为模式，不会被赋值
 * 
 * 3.字符串解构
 *      形如：var/let/const [a, b, c, d, e] = "hello";
 *
 *  4.数值和布尔值，解构会先转换为对象
 *      形如：var/let/const {toString: s} = 123;
 *      s === Number.prototype.toString // true
 * 
 * 5.函数参数解构
 *      同数组和对象的解构
 *      形如： function([a, b]){},  function({x, y}){}
 * 
 * 都允许默认值，
 * let {x=0, y = 1} = {};
 * let [x = 10, y= 20] = [];
 * function({x = 0, y = 1} = {}){}
 * 
 * 结构判断等于的操作为严格相等
 * let {x = 3} = {x:null} //null
 * let {x = 3} = {x:undefined} //undefined
 * 
 * 
 */
//用途示意：
//1.交换变量的值
var x = 0;
var y = 1;
[x, y] = [y, x];

//2.函数多个值传入和返回(对象和数组两种形式)
function f([x, y, z]) {
    return { a: x, b: y, c: z };
}
var {a, b, c} = f([1, 2, 3]);

//3.提取JSON数据
let jsonData = {
    id: 42,
    status: 'ok',
    data: [1, 2, 3]
}
let {id, status, data: numbers} = jsonData;

//4.参数默认值，避免function(a){var x = a || 'default value';}
function f(a = 'default value') { }

//5.遍历map
var map = new Map();
map.set('first', 100);
map.set('second', 200);

for (let [key, value] in map) {
    console.log(key + "is" + value);
}

//6.取指定的方法
let {PI, sin, cos} = Math;