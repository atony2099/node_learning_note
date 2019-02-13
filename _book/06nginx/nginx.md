[前端 nginx 使用札记](https://segmentfault.com/a/1190000013781162)
[Understanding the Nginx Configuration File Structure and Configuration Contexts](https://www.digitalocean.com/community/tutorials/understanding-the-nginx-configuration-file-structure-and-configuration-contexts)
[location 匹配规则](https://moonbingbing.gitbooks.io/openresty-best-practices/ngx/nginx_local_pcre.html)
[nginx 日志详解](http://blog.51cto.com/longlei/2132170)
[log](https://www.tecmint.com/configure-custom-access-and-error-log-formats-in-nginx/)
[谁说前端不需要懂-Nginx 反向代理与负载均衡
](https://juejin.im/post/5b01336af265da0b8a67e5c9)

[HTTP 请求头中的 X-Forwarded-For
](https://imququ.com/post/x-forwarded-for-header-in-http.html)

## 是什么

http 静态服务器 和  反向代理服务器。

### 反向代理服务器

#### vs 正向

[正向代理与反向代理的区别
](https://www.jianshu.com/p/208c02c9dd1d)

![](https://upload-images.jianshu.io/upload_images/3257886-8ab4925e268f5780.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1000/format/webp)

正向代理:客户端访问了代理服务器并主动制定了目标服务器。
(翻墙软件)

反向代理：客户端访问了代理服务器，代理服务器再把请求转发给 server。
(基本所有  大型网站都使用了方向代理)

####  好处

1. 安全  性； 对外隐藏 原始服务器。
2.  实现负载均衡。

####  负载均衡的实现。

部署多台服务器,nginx 分配服务压力较小的  服务器去访问。

```nginx
upstream myapp {
    server192.168.20.1:8080; # 应用服务器1
    server192.168.20.2:8080; # 应用服务器2
}
server {
    listen80;
    location / {
        proxy_pass http://myapp;
    }
}
```

## command

1. nginx reload :重新加载配置文件。
2. service nginx restart： 重启 nginx
3. nginx -t: 验证 nginx  配置

##  结构

{ http{ server,server,upstream } }
层层继承的关系。内层可以重写外层的配置
 范例：

```nginx
#定义 Nginx 运行的用户和用户组,默认由 nobody 账号运行, windows 下面可以注释掉。
user  nobody;

#nginx进程数，建议设置为等于CPU总核心数。可以和worker_cpu_affinity配合
worker_processes  1;

#全局错误日志定义类型，[ debug | info | notice | warn | error | crit ]
#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#进程文件，window下可以注释掉
#pid        logs/nginx.pid;

# 一个nginx进程打开的最多文件描述符(句柄)数目，理论值应该是最多打开文件数（系统的值ulimit -n）与nginx进程数相除，
# 但是nginx分配请求并不均匀，所以建议与ulimit -n的值保持一致。
worker_rlimit_nofile 65535;

#工作模式与连接数上限
events {
    # 参考事件模型，use [ kqueue | rtsig | epoll | /dev/poll | select | poll ];
    # epoll模型是Linux 2.6以上版本内核中的高性能网络I/O模型，如果跑在FreeBSD上面，就用kqueue模型。
   #use epoll;
   #connections 20000;  # 每个进程允许的最多连接数
   # 单个进程最大连接数（最大连接数=连接数*进程数）该值受系统进程最大打开文件数限制，需要使用命令ulimit -n 查看当前设置
   worker_connections 65535;
}

#设定http服务器
http {
    #文件扩展名与文件类型映射表
    #include 是个主模块指令，可以将配置文件拆分并引用，可以减少主配置文件的复杂度
    include       mime.types;
    #默认文件类型
    default_type  application/octet-stream;
    #charset utf-8; #默认编码

    #定义虚拟主机日志的格式
    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #定义虚拟主机访问日志
    #access_log  logs/access.log  main;

    #开启高效文件传输模式，sendfile指令指定nginx是否调用sendfile函数来输出文件，对于普通应用设为 on，如果用来进行下载等应用磁盘IO重负载应用，可设置为off，以平衡磁盘与网络I/O处理速度，降低系统的负载。注意：如果图片显示不正常把这个改成off。
    sendfile        on;
    #autoindex on; #开启目录列表访问，合适下载服务器，默认关闭。

    #防止网络阻塞
    #tcp_nopush     on;

    #长连接超时时间，单位是秒，默认为0
    keepalive_timeout  65;

    # gzip压缩功能设置
    gzip on; #开启gzip压缩输出
    gzip_min_length 1k; #最小压缩文件大小
    gzip_buffers    4 16k; #压缩缓冲区
    gzip_http_version 1.0; #压缩版本（默认1.1，前端如果是squid2.5请使用1.0）
    gzip_comp_level 6; #压缩等级
    #压缩类型，默认就已经包含text/html，所以下面就不用再写了，写上去也不会有问题，但是会有一个warn。
    gzip_types text/plain text/css text/javascript application/json application/javascript application/x-javascript application/xml;
    gzip_vary on; //和http头有关系，加个vary头，给代理服务器用的，有的浏览器支持压缩，有的不支持，所以避免浪费不支持的也压缩，所以根据客户端的HTTP头来判断，是否需要压缩
    #limit_zone crawler $binary_remote_addr 10m; #开启限制IP连接数的时候需要使用

    # http_proxy服务全局设置
    client_max_body_size   10m;
    client_body_buffer_size   128k;
    proxy_connect_timeout   75;
    proxy_send_timeout   75;
    proxy_read_timeout   75;
    proxy_buffer_size   4k;
    proxy_buffers   4 32k;
    proxy_busy_buffers_size   64k;
    proxy_temp_file_write_size  64k;
    proxy_temp_path   /usr/local/nginx/proxy_temp 1 2;

   # 设定负载均衡后台服务器列表
    upstream  backend.com  {
        #ip_hash; # 指定支持的调度算法
        # upstream 的负载均衡，weight 是权重，可以根据机器配置定义权重。weigth 参数表示权值，权值越高被分配到的几率越大。
        server   192.168.10.100:8080 max_fails=2 fail_timeout=30s ;
        server   192.168.10.101:8080 max_fails=2 fail_timeout=30s ;
    }

    #虚拟主机的配置
    server {
        #监听端口
        listen       80;
        #域名可以有多个，用空格隔开
        server_name  localhost fontend.com;
        # Server Side Include，通常称为服务器端嵌入
        #ssi on;
        #默认编码
        #charset utf-8;
        #定义本虚拟主机的访问日志
        #access_log  logs/host.access.log  main;

        # 因为所有的地址都以 / 开头，所以这条规则将匹配到所有请求
        location / {
            root   html;
            index  index.html index.htm;
        }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

       # 图片缓存时间设置
       location ~ .*.(gif|jpg|jpeg|png|bmp|swf)$ {
          expires 10d;
       }

       # JS和CSS缓存时间设置
       location ~ .*.(js|css)?$ {
          expires 1h;
       }

        #代理配置
        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #location /proxy/ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }

    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}

    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;

    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}
}

```

### upstream

upstream: Basically, this context defines a named pool of servers that Nginx can then proxy requests to;
实现负载均衡的模块

### http

1. http ： 配置代理，缓存，日志等。

```nginx
gzip on;
gzip_disable "msie6";
access_log /var/log/nginx/access.log;
error_log /var/log/nginx/error.log;
```

### server

server：配置虚拟主机的相关参数，一个 http 中可以有多个 server。

```nginx
    upstream firstdemo {
        ip_hash;
        server 39.106.145.33;
        server 47.93.6.93;
    }
    server {
        listen 8080;
        location / {
            proxy_pass http://firstdemo;
        }
    }
```

1. ip_hash：ip_hash 它的作用是如果第一次访问该服务器后就记录，之后再访问都是该服务器了
2. proxy_pass：代理到制定服务器  上
3.

### location

1. location = /uri 　　　=开头表示精确匹配，只有完全匹配上才能生效。
2. location ^~ /uri 　　^~ 开头对 URL 路径进行前缀匹配，并且在正则之前。
3. location ~ pattern 　~开头表示区分大小写的正则匹配。
4. location ~* pattern 　~*开头表示不区分大小写的正则匹配。
5. location /uri 　　　　不带任何修饰符，也表示前缀匹配，但是在正则匹配之后。
6. location / 　　　　　通用匹配，任何未匹配到其它 location 的请求都会匹配到，相当于 switch 中的 default。

```nginx
location = / {
echo "规则 A";
}
location = /login {
echo "规则 B";
}
location ^~ /static/ {
echo "规则 C";
}
location ^~ /static/files {
echo "规则 X";
}
location ~ \.(gif|jpg|png|js|css)$ {
echo "规则 D";
}
location ~\* \.png$ {
echo "规则 E";
}
location /img {
echo "规则 Y";
}
location / {
echo "规则 F";
}
```

那么产生的效果如下：
访问根目录 /，比如 http://localhost/ 将匹配 规则 A
访问 http://localhost/login 将匹配 规则 B，http://localhost/register 则匹配 规则 F
访问 http://localhost/static/a.html 将匹配 规则 C
访问 http://localhost/static/files/a.exe 将匹配 规则 X，虽然 规则 C 也能匹配到，但因为最大匹配原则，最终选中了 规则 X。你可以测试下，去掉规则 X ，则当前 URL 会匹配上 规则 C。
访问 http://localhost/a.gif, http://localhost/b.jpg 将匹配 规则 D 和 规则 E ，但是 规则 D 顺序优先，规则 E 不起作用，而 http://localhost/static/c.png 则优先匹配到 规则 C
访问 http://localhost/a.PNG 则匹配 规则 E ，而不会匹配 规则 D ，因为 规则 E 不区分大小写。
访问 http://localhost/img/a.gif 会匹配上 规则 D,虽然 规则 Y 也可以匹配上，但是因为正则匹配优先，而忽略了 规则 Y。
访问 http://localhost/img/a.tiff 会匹配上 规则 Y。
访问 http://localhost/category/id/1111 则最终匹配到规则 F ，因为以上规则都不匹配，这个时候应该是 Nginx 转发请求给后端应用服务器，比如 FastCGI（php），tomcat（jsp），Nginx 作为反向代理服务器存在。
所以实际使用中，笔者觉得至少有三个匹配规则定义，如下：

```nginx
# 第一个必选规则

location = / {
proxy_pass http://tomcat:8080/index
}

# 第二个必选规则是处理静态文件请求，这是 nginx 作为 http 服务器的强项

# 有两种配置模式，目录匹配或后缀匹配，任选其一或搭配使用

location ^~ /static/ {
root /webroot/static/;
}
location ~* \.(gif|jpg|jpeg|png|css|js|ico)$ {
    root /webroot/res/;
}



# 第三个规则就是通用规则，用来转发动态请求到后端应用服务器

# 非静态文件请求就默认是动态请求，自己根据实际把握

# 毕竟目前的一些框架的流行，带.php、.jsp 后缀的情况很少了

location / {
proxy_pass http://tomcat:8080/
}
```

#### root

```
location ^~ /t/ {
     root /www/root/html/;
}

```

如果一个请求的 URI 是/t/a.html 时，web 服务器将会返回服务器上的/www/root/html/t/a.html 的文件

#### alias

```
location ^~ /t/ {
 alias /www/root/html/new_t/;
}
```

如果一个请求的 URI 是/t/a.html 时，web 服务器将会返回服务器上的/www/root/html/new_t/a.html 的文件
直接把整个 location 替换掉

#### try_files

```
try_files file ... uri;
```

Checks the existence of files in the specified order and uses the first found file for request processing;

```nginx
location /images/ {
    try_files $uri /images/default.gif;
}

```

## 如何配置

### 配置反向代理服务器

```nginx
upstream movies{
   server 127.0.0.1:3003;
   server 127.0.0.1:3004;
}
server {
    listen 80;
    server_name movies.atony2099.top;
    location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host; # defalt is  $proxy_host
        proxy_set_header X-Nginx-Proxy true;
        proxy_pass      http://movies;
        proxy_set_header Connection ""; # default is close
    }
}
```

1.  proxy_set_header 在将客户端请求发送给后端服务器之前，更改来自客户端的请求头信息。

    > 1.1.1.1 -> proxy-2.2-> proxy-3.3-> server

    1.  X-Forwarded-For 转发的代理  服务器。
        X-Forwarded-For = 1.1.1.1,proxy-2.2
    2.  X-Real-IP:请求的真是 ip
        X-Real-IP=1.1.1.1
    3.  Connection "" : 配置 Connection 为 empty;则 Connection 会采用默认的配置。1.1 中为 keep alive

### 配置 1

```nginx
upstream node{
   server 127.0.0.1:8887;
}
server {
    listen 80;
    server_name m.dc.wmlives.com;
    root /vol/web/root;
    index index.html index.htm index.php;

    set_real_ip_from  10.0.0.0/8;
    real_ip_header    X-Forwarded-For;


    location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host  $http_host;
        proxy_set_header X-Nginx-Proxy true;
        proxy_set_header Connection "";
        proxy_pass      http://node;

    }
}
```

### niginx 压缩

```
http {
     gzip  on; // 打开压缩
     gzip_min_length 1k; // 最小压缩字节
     gzip_buffers    16 64k;
     gzip_http_version 1.1; // http 版本
     gzip_comp_level 4; // 压缩级别 1-9
     gzip_types  text/plain application/javascript application/x-javascript text/javascript text/xml text/css;
     gzip_vary on;//给http请求增加vary字段， 不支持gzip的不进行压缩处理。

}
```
