#pm2

## 是什么

pm2 是开源的基于 Nodejs 的进程管理器，包括守护进程，监控，日志的一整套完整的功能，

## 常用命令

pm2 start index.js 等同于 node xxx.js
pm2 stop index.js
pm2 list


### pm2 升级
Updating PM2
Updating PM2 is extremely fast (less than few seconds) and seamless.

First make sure that you saved correctly all your processes:
```
pm2 save
```
Then install the latest PM2 version from NPM:
```
npm install pm2 -g
```
And finally update the in-memory PM2 process:
```
pm2 update
```
That’s all, you now have a fresh and up-to-date PM2 syste

### 发布

pm2 deploy <environment> setup

pm2 deploy <configuration_file> <environment> <command>

## CLI

reload <name|all> reload processes (note that its for app using HTTP/HTTPS)

kill:   杀死进程