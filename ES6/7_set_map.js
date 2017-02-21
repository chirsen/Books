/**
 * 使用set去重
 * 精确 ==== 中， NaN不等于NaN
 * set中判断等于，NaN 等于 NaN
 */
var arr = [2, 3, 4, 5, 3, 4, 2, 5];
var s = new Set();
arr.forEach(x => s.add(x));
console.log([...s]);
//或者直接
s = new Set(arr);
console.log([...s]);
//或者
console.log( Array.from(new Set(arr)) );

/**
 * Set 方法：
 * add(value)
 * delete(value)
 * has(value)
 * clear()
 * 
 * Set属性：
 * Set.prototype.constructor
 * Set.prototype.size
 * 
 * Set遍历方法
 * keys(), values(), entries(), forEach()
 */

//Set实现的集合 并， 交， 差
let a = new Set([1, 2, 3]);
let b = new Set([4, 2, 3]);

let union = new Set([...a, ...b]);
let intersect = new Set([...a].filter(x => b.has(x)));
let diff = new Set([...a].filter(x => !b.has(x)));




/**
 * Map 与字面量对象相比，键值可以是各种类型的值。但是得注意，如果是引用的话，是需要引用相同的
 */
var map = new Map();
var a = ['a'];
map.set(a, 100);
map.get(a);          //100
map.get(['a']);      //undefined

/**
 * 属性与遍历方法
 * 同Set, 除了Set中的add方法换成set方法
 * 可以与数组对象相互转换
 * 可以与对象相互转换（键是字符串）
 */