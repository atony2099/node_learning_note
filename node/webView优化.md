# webView 优化

[浏览器的渲染原理简介](https://coolshell.cn/articles/9666.html)
[原来 CSS 与 JS 是这样阻塞 DOM 解析和渲染的](https://juejin.im/post/59c60691518825396f4f71a1)
[Javascript 装载和执行
](http://www.linjunlong.com/p/1156.html)



![](https://tech.meituan.com/img/webviewspeed/time.png)


## 浏览器的解析过程。
![](https://coolshell.cn/wp-content/uploads/2013/05/Render-Process-768x250.jpg)


![](http://taligarsiel.com/Projects/webkitflow.png)

1. dom tree 和你 css tree 的生成。
分别生成 Dom tree 和 css Tree;
dom tree 和 css tree 会 生成 render tree 
关键点：css没有down下来的时候是不会开始render过程，也就是 css 会阻塞Dom的渲染。

dom tree
![](https://coolshell.cn/wp-content/uploads/2013/05/DOM-Tree-01.jpg)



css tree
```
 /* rule 1 */ doc { display: block; text-indent: 1em; }
/* rule 2 */ title { display: block; font-size: 3em; }
/* rule 3 */ para { display: block; }
/* rule 4 */ [class="emph"] { font-style: italic; }

```

![](https://coolshell.cn/wp-content/uploads/2013/05/CSS-Rule-Tree-Example.jpg)


attachment

![](https://coolshell.cn/wp-content/uploads/2013/05/CSS-Content-Tree-Example.jpg)




2. render 过程
![](https://coolshell.cn/wp-content/uploads/2013/05/Render-Process-Skipping-1024x282.jpg)



## css 解析
css 不会阻塞dom tree 的生成，但是会阻塞 css  tree的生成。


##js 解析

1. js <script>

```
<script src="//other-domain.com/1.js"></script>
<script src="2.js"></script>
```
  1. js downloading is parallel,excute order by order
  2. 执行script 的过程中会阻塞页面的渲染：浏览器觉得js 可能会操作dom，导致他白渲染了
  3. 浏览器遇到script ，都会重新渲染一次
   ```
   <body>
    <div></div>
    <script src="/js/sleep3000-logDiv.js"></script>
    <style>
        div {
            background: lightgrey;
        }
    </style>
    <script src="/js/sleep5000-logDiv.js"></script>
    <link rel="stylesheet" href="/css/common.css">
    </body>
    ```
  








## webview的初始化


| 首次初始化时间   | 二次初始化时间 |
| ---------------- | -------------- |
| iOS（UIWebView） | 306.56         | 76.43  |
| iOS（WKWebView） | 763.26         | 457.25 |
| Android          | 192.79 *       | 142.53 |






# 优化监控工具

## 





##   相关指标
![](https://developers.google.com/web/fundamentals/performance/images/perf-metrics-load-timeline.png)
first-contentful-paint: something has happen; first element paint;


first-meaning-content:be useful




















