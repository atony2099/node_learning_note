# get - post



# MINE TYPES:
>  mutipurpose internet mail extensions
##参考
[MIME types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types)


## vs
type/subType

| Type        | Description                                                                                                                          | Example of typical subtypes                                                                                                                                 |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| text        | Represents any document that contains text and is theoretically human readable                                                       | text/plain, text/html, text/css, text/javascript                                                                                                            |
| image       | Represents any kind of images. Videos are not included, though animated images (like animated gif) are described with an image type. | image/gif, image/png, image/jpeg, image/bmp, image/webp, image/x-icon, image/vnd.microsoft.icon                                                             |
| audio       | Represents any kind of audio files                                                                                                   | audio/midi, audio/mpeg, audio/webm, audio/ogg, audio/wav                                                                                                    |
| video       | Represents any kind of video files                                                                                                   | video/webm, video/ogg                                                                                                                                       |
| application | Represents any kind of binary data.                                                                                                  | application/javascript, application/octet-stream, application/pkcs12, application/vnd.mspowerpoint, application/xhtml+xml, application/xml, application/pdf |

## Accept-type
告知对方可以处理的MINE Type类型
## contentType
指定响应(请求)内容的类型。
### post请求常见的 content-type

- application/x-www-form-urlencoded
原生表单的提交形,提交的数据会转换为
```js
POST http://www.example.com HTTP/1.1
Content-Type: application/x-www-form-urlencoded;charset=utf-8

name=test&val1=1&val2=%E6%B5%8B%E8%AF%95&val3%5B%5D=2
```

- application/json
json形式能支持更复杂的数据结构
```js 
POST http://www.example.com HTTP/1.1 
Content-Type: application/json;charset=utf-8

{"title":"test","sub":[1,2,3]}
```


#body-parase

## body-parse的实现机制
[Nodejs 进阶：Express 常用中间件 body-parser 实现解析](https://www.cnblogs.com/chyingp/p/nodejs-learning-express-body-parser.html)