[babel-preset-env: a preset that configures Babel for you
](http://2ality.com/2017/02/babel-preset-env.html)
[transform-runtime](https://github.com/lmk123/blog/issues/45)
[@babel/plugin-transform-runtime](https://babeljs.io/docs/en/babel-plugin-transform-runtime/)
[21 分钟精通前端 Polyfill 方案](https://zhuanlan.zhihu.com/p/27777995)

## 版本

ES6 2017
ES6 2015
ES7 2016
ES8 2017

```javascript
{
  "presets": ["env", "stage-0", "react"], //转码的规则
  "plugins": [
    "transform-runtime",
    "transform-decorators-legacy",
    "transform-class-properties"
  ]
}
```

## 机制

const destinatonCode = (origin ) = > transform[sourceCode][plugin]
babel 通过一系列 plugin 来工作

## preset

插件的集合;

### env: es2015-es2017

`$ npm install --save-dev babel-preset-react`

### stage

不同阶段语法提案的转码规则（共有 4 个阶段），选装一个
Stage 0 - Strawman: just an idea, possible Babel plugin.
Stage 1 - Proposal: this is worth working on.
Stage 2 - Draft: initial spec.
Stage 3 - Candidate: complete spec and initial browser implementations.
Stage 4 - Finished: will be added to the next yearly release.

## babel-polyfill && transform-runtime

<!--
需要使用新的 api：Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise 等全局对象，
babel-polyfill 转义的时候会引入很多重复文件，transform-runtime 相当于一个语法优化， 有效减少重复文件。 -->

### polyfill 植入

作用:

1. 提供一些目前浏览器  没有提供的 api

包含的  库：

1. core-js
1. regenerator

### transform-runtime

1.  将  各个文件的 helper 函数集中在一起，可以减少包的大小
   `require('babel-runtime/helpers/classCallCheck')`

2. 他也有 corejs 和 regenerator  提供和 polyfill 一样的功能，植入没有的 api

```js
var sym = Symbol();
var _symbol = require("@babel/runtime-corejs2/core-js/symbol");
```

3. transfrom-runtime 的配置
   ```js
    // default config
   {
    "plugins": [
      [
        "@babel/plugin-transform-runtime",
        {
          "corejs": false,
          "helpers": true,
          "regenerator": true,
          "useESModules": false
        }
      ]
    ]
   }
   ```
   1. regenerator： 引入 transform 的 regenerator 库，避免全局污染
   2. corejs 库 ： 使用新的 api
