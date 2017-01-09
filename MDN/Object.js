/*继承*/
function Employee(){
	this.dept = "general";
}
//可在子类实例运行完成后进行更改
Employee.prototype.name = "init";


function WorkerBee(){
	this.projects = [];
}
WorkerBee.prototype = new Employee;



var amy = new WorkerBee;
console.log(amy.dept);
console.log(amy.name);
//属性更改检测
Employee.prototype.dept = "eg";
Employee.prototype.name = "unknow";
console.log(amy.dept);
console.log(amy.name);




/*forEach 对象复制函数*/
function copy(obj){
	var copy = Object.create(Object.getPrototypeOf(obj));
	var protoNames = Object.getOwnPropertyNames(obj);

	protoNames.forEach(function(name){
		var desc = Object.getOwnPropertyDescriptor(obj, name);
		Object.defineProperty(copy, name, desc);
	});

	return copy;
}
//对象复制检测
var amy2 = copy(amy);
console.log(amy2.dept);