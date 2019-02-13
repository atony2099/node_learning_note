# docker

![](https://pic3.zhimg.com/80/v2-d5c06c456761b5a27090e3328b1f6882_hd.jpg)

## 是什么？

轻量级的 linux 系统
![](https://user-gold-cdn.xitu.io/2018/9/4/165a22841b75268f?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

1. dockerfile: 一系列的指令。 煮菜的食谱。
2. docker image: build from dockerfile;(class)
3. docker container: a instance of dockerimagd;(object)

## docker tag

 标记版本， 类似 git 的 tag,默认是 lastes;

x'w

## docker file

```docker
FROM node

RUN mkdir -p /home/project

WORKDIR /home/project

EXPOSE 3000

CMD npm install --registry=https://registry.npm.taobao.org && node ./index.js

```

## docker tag

## image

### 是什么

```docker
docker build [OPTIONS] PATH | URL | -

// for1
docker build --rm --no-cache=true  -t node  - < Dockerfile

//for2
docker build -t nginx:v1 .
```

--rm: Remove intermediate containers after a successful build (default true)
--no-cache: Do not use cache when building the image
-t:Name and optionally a tag in the 'name:tag' format

## container

### rename

```
docker reanme container newcontainer
```

### kill

### run

```docker
docker run [OPTIONS] IMAGE [COMMAND] [ARG...]

// jekins
docker run -d -p 9000:8080 -p 50000:50000 -v /var/jenkins_node:/var/jenkins_home jenkins
```

1. -p localport:imageDocker;
2. -d Run container in background and print container ID
3. --name : assign a name to container
4. -v --volumn: 持久化运行的数据

### docker logs

fetch the logs of a container

### volumne;

数据同步。
containr/data 与 localhost/data 同步起来。

## docker 自动化部署。

### 1. run container

```shell
sudo docker run -d -u 0 --privileged  --name jenkins_node1 -p 9000:8080 -v /root/jenkins_node1:/var/jenkins_home jenkins
```

--privileged: Give extended privileges to this container
-u

### 2. copy ssh key to server

```shell
docker exec -it myJenk /bin/bash
mkdir ~/.ssh && cd ~/.ssh
ssh-copy-id -i ~/.ssh/id_rsa.pub  root@47.95.200.95
```

```
docker exec -it  tree_hole_mongodb_1 /bin/bash
```

### 2. run container

```shell
sudo docker stop nodeapp || true \
 && sudo docker rm nodeapp || true \
 && cd /root/jenkins_node1/workspace/node \
 && sudo docker build --rm --no-cache=true  -t node  - < Dockerfile \
 && sudo docker run -d --privileged=true --name nodeapp -p 3000:3000 -v /root/jenkins_node1/workspace/node:/home/project node

```

## dockerfile

```docker
#继承
FROM node:8.9.4-alpine

#执行命令
RUN mkdir -p /usr/src/app

#工作区域
WORKDIR /usr/src/app
#复制
COPY package.json /usr/src/app/

RUN npm i --production

COPY . /usr/src/app

CMD npm run docker

```

1. from  继承
2. RUN 执行命令 CMD
3. COPY: let you copy files from a specific location into a Docker image.
   copy src des

## docker-compose

是什么？

Define and run multi-container applications with Docker.

##备忘

```shell
# docker exec -it d74ea8ac5e20 sh

```
