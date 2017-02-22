/**
 * 用于修改某些操作的默认行为（在Object的一些原生方法前，加一层拦截，做自己的处理）。
 * 对应的Reflect为操作对象提供了新的API。 从Reflect可以拿到语言内部的方法
 */
/**
 * Proxy支持的拦截操作有：
 */

/**
 * Proxy : get(target, propKey, reciver)拦截属性的读操作
 * Reflect: Reflect.get(target, name, reciver) 查找并返回target对象的name属性，没有返回undefined
 *          类似
 * 
*/
var person = {
    name: "zhangsan"
};
var proxy = new Proxy(person, {
    get: function (target, prop) {
        console.log(target);
        console.log(prop);
    }
});
proxy.name;         //在访问name属性前，打印访问的对象和属性的名

// 创建一个数组，可以用负下标访问
function createArray(...elements) {
    let handler = {
        get(target, props, reciver) {
            let index = Number(props);
            if (index < 0) {
                props = String(target.length + index);
            }
            //保证原生的get方法生效
            return Reflect.get(target, props, reciver);
        }
    }
    let target = [];
    target.push(...elements);
    return new Proxy(target, handler);
}
var arr = new Array(createArray('a', 'b', 'c')) ;
console.log(arr[-1]);
console.log(typeof arr);

//get实现属性（注意，是属性）的链式操作

function pip(value) {
    let funcStack = [];
    let proxy = new Proxy({}, {
        get(target, fnName) {
            if (fnName === 'get') {
                return funcStack.reduce((val, curFn) => {
                    return curFn(val);
                }, value);
            }
            funcStack.push(fnName);
            return proxy;
        }
    });
    return proxy;
}

var double = n => n * 2;
var pow = n => n * n;
var reverseInt = n => n.toString().split("").reverse().join("") | 0;

pipe(3).double.pow.reverseInt.get; // 63

//如果一个属性不可修改，不可写，使用Proxy访问,如果不返回target[propKey]则会报错
var obj = {}; 
Reflect.defineProperty(obj, "a", {
    value: "10",
    writable: false,
    configurable: false
});
var proxy = new Proxy(obj, {
    get(target, prop){
        return "a";
    }
});

//set拦截某个属性的赋值操作（可用于输入检测和过滤）
let obj = new Proxy({}, {
    set(target, prop, value, reciver){
        if(value < 0){
            console.log("该属性不能小于0");
        }else{
            console.log("合法数据");
            return Reflect.set(target, prop, value, reciver);
        }
    }
});
obj.a = 100;
obj.b = -10;
//也可用于配置不可被访问的属性(规定属性名首字母为下划线的不可被外部设置)
let inProp = new Proxy({}, {
    set(target, propKey, value, reciver){
        if(propKey[0] === '_'){
            throw new Error(`Invalid attempt to set private "${propKey}" property`);
        }else{
            Reflect.set(target, propKey, value, reciver)
        }
    }
});

inProp.a = 10;   //设置成功
inProp._a = 12;  //Invalid attempt to set private "_a" property



/***
 * Proxy的apply方法，拦截函数的调用，call，apply
 */
