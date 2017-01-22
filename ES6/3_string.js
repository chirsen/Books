/**
 * 字符串的扩展 
 * JavaScript内部，字符以UTF-16的格式储存，每个字符固定为2个字节。
 * 对于那些需要4个字节储存的字符（Unicode码点大于0xFFFF的字符），JavaScript会认为它们是两个字符。
 * 
 * 1.unicode表示的能力提升 (code_1)
 *  a. 中括号形式表示超出范围的码点 "\uD842\uDFB7" --> "\u{20BB7}"
 *  b. codePointAt() 能够正确处理4个字节储存的字符，返回一个字符的码点。
 *  c. String.fromCodePoint() 与codePointAt对应
 *  d. 使用for...of...可以正确的遍历字符串，可以识别大于0xFFFF的码
 *  e. at() 方法，可以识别大于0xFFFF的码
 *  f. normalize()方法，用来将字符的不同表示方法统一为同样的形式，这称为Unicode正规化
 * 
 * 2.确定包含的的三个新方法includes(), startsWith(), endsWith()  跟indexOf()用法一致
 * 
 * 3.repeat() (code_3)
 *      用法："str".repeat(num), str重复num次
 *      num <= -1 || num = Infinity 报错；Math.abs(num) < 1, num会被转化为0， 字符串先转化为数字
 *  
 * 4.padStart()，padEnd() (code_4)
 *      用法：str.padXXX(num, str1)
 *      用str1前补全或者后补全str为num长度的字符串
 * 
 * 5.模板字符串 *****重点******  (code_5)
 *      用法：`xxxx`
 *      增强版字符串，可用于，多行，字符串中嵌入变量
 * 
 * 6. 标签模板 (code_6)
 *      用法：fn`xxxxxx ${exp} sssss ${exp}`
 *      紧跟在一个函数名后面，该函数将被调用来处理这个模板字符串。这被称为“标签模板”功能（tagged template）。
 * 
 * 7.String.raw 对字符串中的'\'反斜杠进行转义
 */

/*code_1_a*/
'\z' === 'z'  // true
'\172' === 'z' // true
'\x7A' === 'z' // true
'\u007A' === 'z' // true
'\u{7A}' === 'z' // true

/*code_1_b-e*/
var s = "𠮷";
console.log(s.length);          //2
console.log(s.charAt(0));       //"�"
console.log(s.at(0));           //运行不了
console.log(s.charCodeAt(0));   //55362
console.log(s.codePointAt(0));  //134071

String.fromCharCode(s.charCodeAt(0).toString()); //"�"
String.fromCodePoint(s.charCodeAt(0).toString(), s.charCodeAt(1).toString()); //𠮷


/*code_3*/
'x'.repeat(3) // "xxx"
'hello'.repeat(2) // "hellohello"
'na'.repeat(0) // ""

//code_4(firfox可用，其他的浏览器不支持)
'1'.padStart(6, '0');       //000001
'365'.padStart(6, '0');     //000365

'12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
'09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"

/*code_5*/
var body = document.getElementsByTagName("body")[0];
var obj = {
    first: 100,
    second: 1000
};
//分行，变量， 嵌套示例
body.innerHTML = `
    <ul>
        <li>first: ${obj.first}</li>
        <li>second ${obj.second}</li>
        <li>${`
            <ul>   
                <li>third</li>
                <li>this is inner</li>
            </ul>
             `}
        </li>
    </ul>
`;

//一个模板编译过程（4步）
//1.模板 <% 代码 %> <%= 表达式 %>
var template = `
<ul>
  <% for(var i=0; i < data.supplies.length; i++) { %>
    <li><%= data.supplies[i] %></li>
  <% } %>
</ul>
`;
//2.转化为表达式字符串（`` 多行:) ）
/**
 *  echo('<ul>');
 *  for (var i = 0; i < data.supplies.length; i++) {
 *      echo('<li>');
 *      echo(data.supplies[i]);
 *      echo('</li>');
 *  };
 *  echo('</ul>');
 */
var evalExpr = /<%=(.+?)%>/g;
var expr = /<%([\s\S]+?)%>/g;

template = template
    .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
    .replace(expr, '`); \n $1 \n  echo(`');

template = 'echo(`' + template + '`);';

//3.得到一个函数
var script =
    `(function parse(data){
    var output = "";

    function echo(html){
      output += html;
    }

    ${ template}

    return output;
  })`
var parse = eval(script);

//4.调用
parse({ supplies: ["broom", "mop", "cleaner"] });

//通过上述步骤，得到一个可以传入模板，数据，返回字符串的函数
function compile(template, data) {
    var evalExpr = /<%=(.+?)%>/g;
    var expr = /<%([\s\S]+?)%>/g;

    template = template
        .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
        .replace(expr, '`); \n $1 \n  echo(`');

    template = 'echo(`' + template + '`);';

    var script =
        `(function parse(data){
    var output = "";

    function echo(html){
      output += html;
    }

    ${ template}

    return output;
  })`;

    return eval(script)(data);
}


/*code_6*/
var a = 5;
var b = 10;
tag`Hello ${a + b} world ${a * b}`;
// 等同于
tag(['Hello ', ' world ', ''], 15, 50);

//将各个参数按照原来的位置拼接回去（两种方法）
var total = 30;
var msg = passthru`The total is ${total} (${total * 1.05} with tax)`;
var msg2 = passthru2`The total is ${total} (${total * 1.05} with tax)`;
//method one
function passthru(literals) {
    var result = '';
    var i = 0;

    while (i < literals.length) {
        result += literals[i++];
        if (i < arguments.length) {
            result += arguments[i];
        }
    }

    return result;
}
//method_2
function passthru2(args, ...values) {
    var output = args[0];
    for (let i = 0; i < values.length; i++) {
        output += values[i] + args[i + 1];
    }
    return output;
}
console.log(msg);
console.log(msg2);

//用来进行html字符串过滤
var sender = '<script>alert("abc")</script>';
var msg = filter`<p>${sender} has sent you a message.</p>`;
function filter(args, ...values) {
    var output = args[0];
    for (let i = 0; i < values.length; i++) {
        output += values[i].replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/&/g, '&amp;');
        output += args[i + 1];
    }
    return output;
}
console.log(msg);