# 这是一篇测试相关的内容  
> 应用朴灵的话，测试可以让让自己对自己的代码，了解得如同手心的掌纹般清晰。开发者首先消费自己的代码，是一种对自己产出负责的态度。此处，仅仅是自己对测试的相关实践。 

## 将要讲到的内容：  
1. **一个自己实现的测试套件**
2. **使用别人的测试套件一次演示**
3. **使用webpack和karma对vue组件的一个测试**
4. **集成测试的演示**

+ ## 自己写的测试套件  
我们在使用一件工具的时候，特别是较为复杂麻烦的工具，我们应该想象一下它是怎么来的。如下介绍的，是《js忍者秘籍》中的实现，涉及到：单个测试，组测试，异步测试。  

### 一个单个的页面例子
``` 
// 完整内容参考：simpleTest.html
function assert(value, descript){
    var ul = document.querySelector('#result');
    var li = document.createElement('li');
    li.className = value ? 'pass' : 'fail';
    li.innerHTML = descript;
    ul.appendChild(li);
}

window.onload = function() {
    assert(true, '这是正确的');
    assert(false, '这是错误的');
}
```  

如上只是对一个语句做正确与否的检测。我们写的代码过程，通常是一个堆砌逻辑，完成功能的过程。所以，很多的时候，我们需要把很多的单个的测试，合成一个单位，完成对一个单位，一个组的检查。  

### 一个组测试  
```js
// 完整内容参考：
// 这是一个封装的组测试
(function(){
    var container, result = true;
    window.assert = function assert(value, descript){
        var li = document.createElement('li');
        li.className = value ? 'pass' : ('fail');
        if(!value) {
            result = false;
        }
        container.appendChild(li);
        li.appendChild(document.createTextNode(descript));
        return li;
    }
    window.test = function test(name, fn){
        var ul = document.createElement('ul');
        container = document.querySelector('#result');
        assert(true, name).appendChild(ul)
        container = ul;
        ul.className = !result ? 'total-pass' : 'some-fail';
        fn();
    }
})();

window.onload =function(){
    test('test1', function(){
        assert(true, 'true');
        assert(false, 'false');
        assert(true, 'true');
    });
    test('test2', function(){
        assert(true, 'true');
        assert(true, 'true');
        assert(true, 'true');
    });
};
```
很多情况下，我们的代码总是涉及到异步请求，所有，光有同步的测试是不够的，下面来看看异步的测试套件：  
```
// 详细代码见： asyncTest.html
```
+ ## 使用别人的测试套件一次演示  
测试主要的用到的内容：测试框架，断言库，代码覆盖率工具  
测试框架： Mocha、Jasmine等等  
断言库： Should.js、chai、expect.js等等  
代码覆盖率：istanbul等  
如下，使用mocha, should.js, 完整代码参考：example1 文件
```js
// 首先安装mocha和should
npm install --save-dev mocha should

// 完成之后，进入node_modules/.bin 
_mocha ../../test/index.js

// 即可查看测试通过情况
```
文件中，index.js对