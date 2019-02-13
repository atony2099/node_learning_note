[Babel的使用
](https://segmentfault.com/a/1190000008159877)

[Babel 用户手册](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/user-handbook.md#toc-babel-cli)

[babel中文文档](https://babel.bootcss.com/docs/plugins/#%E8%BD%AC%E8%AF%91-plugin)


[Babel 学习
](https://www.cnblogs.com/SamWeb/p/6245924.html)
[ES6 + Webpack + React + Babel 如何在低版本浏览器上愉快的玩耍(下)](https://blog.csdn.net/a324539017/article/details/52824189)

## 是什么
将ES6+的代码转换成可以在低版本的环境中还可以运行的一套工具链。

## 安装方式
1. 引入babel?
    1. webpack，配合babel-loader + babel-core实现
    2. node: babel-cli


2. node测试和运行时的差异
  1.  测试:
    ```
    "start": "nodemon src/index.js --exec babel-node",
    ````
    node文件
    问题：babel-node会消耗大量资源，不适合在线上使用。

  2. 正式：

      1. 先编译后运行
        ```js
        "build": "babel lib -d dist",
          "serve": "node dist/index.js"
        ````
      2. babel-register: 动态编译，会在编译的动态编译



## es6发展

es发布的阶段：
1. 每年都会发布一个版本。es6(es2015) es2016 es2017
2. 每个功能，都会经过五个提案阶段。 stage0-stag5,stage2:草案阶段


3. 通过preset plugins明确告诉如何转化。
  preset是pluigins插件的集合
  常用：preset-2015, 2016 2017
  包含：
  1. es2015-arrow-functions
  2. es2015-destructuring
  3. ...

```
{
  "presets": [env],
  "plugins": []
}
```
npm install babel-preset-env --save-dev
> babel-preset-es2015, babel-preset-es2016, and babel-preset-es2017 together




## 不能使用新的api
babel的问题：
对于一些新的api不会自动转换：
常见的api有
> Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise Object.assign

在低端浏览器上更明显,会导致白屏。

解决方案；
1. babel-polyfill，直接require
问题：全局导入。会使包变大，并造成全局污染。

2. babel-plugin-transform-runtime
相比上面，是按需加载，不会一下子全部引入。比较合理







babel不能转换新的api如Promise
1. babel-polyfill
包含regenerator runtime、core-js；
全部导入，会使得包很大。
需要一开始就导入

问题：


1. babel-plugin-transform-runtime:
是什么？
包含regenerator runtime、core-js；


