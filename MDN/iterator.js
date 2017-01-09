/*function* fibonacci(){
  var fn1 = 1;
  var fn2 = 1;
  while (1){
    var current = fn2;
    fn2 = fn1;
    fn1 = fn1 + current;
    var reset = yield current;
    if (reset){
        fn1 = 1;
        fn2 = 1;
    }
  }
}

var sequence = fibonacci();
console.log(sequence.next());     // 1
console.log(sequence.next());     // 1
console.log(sequence.next());     // 2
console.log(sequence.next());     // 3
console.log(sequence.next());     // 5
console.log(sequence.next());     // 8
console.log(sequence.next());     // 13
// console.log(sequence.send(true)); // 1
console.log(sequence.next());     // 1
console.log(sequence.next());     // 2
console.log(sequence.next());     // 3*/


var handler = {
  get: function(target, name){
    return name in target ? target[name] : 42;
}};
var p = new Proxy({}, handler);
p.a = 1;
console.log(p.a, p.b); // 1, 42