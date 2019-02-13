[前端安全之 XSS 攻击](https://www.cnblogs.com/unclekeith/p/7750681.htmlhttps://www.cnblogs.com/unclekeith/p/7750681.html)

# csrf

cross-site request forgery: 跨站请求伪造.

## what is csrf?

Cross-site request forgery

1. 同源策略并没有限制限制标签<image><video> 的请求 以及 <form></form>发出的 post 请求 ;
2. 别的网站通过标签发出请求，会携带 cookie 等用户信息，通过服务端的验证。

## how to solve

token:
在请求参数或者 header 中增加 token 字段，该 token 字段 value 由服务端下发；
服务端对每个请求(post，put)增加 token 校验。

# xss

cross-site scripting: 跨站脚本攻击

## what is xss?

当前页面注入一段不在预期内的脚本。

for:

1. 搜索框 输入 <script>alert('alert(document.cookie)')</script>,
2. html 页面直接执行这段脚本，弹出一个 alert

## how to solve

对用户提交的内容进行。

1. 转义：转换成普通字符串
2. 过滤：富文本的内容就不要全部转义，只对危险标签进行转义、

```js
function escape(str) {
  str = str.replace(/&/g, "&amp;");
  str = str.replace(/</g, "&lt;");
  str = str.replace(/>/g, "&gt;");
  str = str.replace(/"/g, "&quto;");
  str = str.replace(/'/g, "&#39;");
  str = str.replace(/`/g, "&#96;");
  str = str.replace(/\//g, "&#x2F;");
  return str;
}

// -> &lt;script&gt;alert(1)&lt;&#x2F;script&gt;
escape("<script>alert(1)</script>");
```

```js
// 只转义危险的标签。
var xss = require("xss");
var html = xss('<h1 id="title">XSS Demo</h1><script>alert("xss");</script>');
// -> <h1>XSS Demo</h1>&lt;script&gt;alert("xss");&lt;/script&gt;
console.log(html);
```
