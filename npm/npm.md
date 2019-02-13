## npm

node abc@1.0.0 制定版本

## 安装

```js
npm install -g npm@latest //安装最新版本
npm install -g npm@next
```

## args

1. npm run [-- <args>...]

Note the necessary --. It is needed to separate the params passed to npm command itself and params passed to your script

2. let HOST = process.argv.splice(2)[0]

## 命令

--save = -S
--save-dev = -D
--global = -g
