/**
 * 遇到的问题：不知到总的promise的个数，但是需要顺序执行
 * 即不能用
 * while(){
 *      p = p.then(resolve => {
 *          XXXX;
 *          return Promise.resolve(YYY);
 *      });
 * }
 * 的形式
 */
//其实跟回调一样，但是想不出其他方法
function a() {
    var p = new Promise(function (resolve, reject) { XXXXX });
    p.then(value => {
        if (xxx) {
            a();
        } else {
            return;
        }
    });
}

//首先明确，promise并不是消灭了回调，它只是一种格式上的变化；
//1. 新建Promsie对象就会立即执行；
//2. 无法获取中间状态

//一个ajax的promise封装
function ajax(url, method) {
    return new Promise((resolve, reject) => {
        let client = new XMLHttpRequest();
        client.open(method.toUpperCase(), url);
        client.onreadystatechange = handler;
        client.responseType = "json";
        client.setRequestHeader("Accept", "application/json");
        client.send();

        function handler() {
            if (this.readyState !== 4) {
                return;
            }

            if (this.status === 200) {
                resolve(this.response);
            } else {
                reject(new Error(this.statusText));
            }
        }
    });
}