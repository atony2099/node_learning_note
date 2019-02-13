# jwt

## json web token

```Mermaid
graph TD
A((登录)) -->C{验证通过}
C -->|否| A
C -->|是| D[生成jwt]
D --> E[返回jwt给客户端]
```

## 做什么的？

 生成客户端的唯一标识符

## 和 session 相比的优势？

### session 的验证

1.  验证通过 生成{id:user}session 记录。
2. 返回 id 给客户端，客户端存储在 cookie， 每次请求携带 sessionID;

### jwt 优势

1. jwt 信息不存储在服务器，不牵涉到多条服务器共享数据问题， 方便扩展。
2.  统一一多端的验证方式

## 如何生成

```js
const jwtSecrect = jwt.sign(info, this.config.tokenSecrect, {
  expiresIn: "168h"
});
```

## 如何验证。

```Mermaid
graph TD
  C -->|否| F
  D -->|否| F
  subgraph API
  A((请求API)) -->|是| C{是否携带token}
  C -->|是| D{token是否有效}
  D -->|是| E[验证通过]
  end
  subgraph 401
  F[401 ERROR]
  end
```

```js
const result = await verify(token, app.config.tokenSecrect);
```
