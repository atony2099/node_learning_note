// application.js
let http = require("http");
let context = require("./context");
let request = require("./request");
let response = require("./response");

let EventEmitter = require("events");

class Application extends EventEmitter {
  /**
   * 构造函数
   */
  constructor() {
    super();
    this.callbackFunc;
    this.middlewares = [];
    this.context = context;
    this.request = request;
    this.response = response;
    console.log("====", this.request, this.callbackFunc);
  }

  /**
   * 开启http server并传入callback
   */
  listen(...args) {
    let server = http.createServer(this.callback());
    server.listen(...args);
  }

  /**
   * 挂载回调函数
   * @param {Function} fn 回调处理函数
   */
  use(fn) {
    this.middlewares.push(fn);
    this.callbackFunc = fn;
  }

  async compose(ctx) {
    let next = this.middlewares.reduceRight((compose, f) => async () =>
      f(ctx, compose)
    );
    await next();
  }

  /**
   * 获取http server所需的callback函数
   * @return {Function} fn
   */
  callback() {
    return (req, res) => {
      let ctx = this.createContext(req, res);
      let respond = () => this.responseBody(ctx);
      let onerror = err => this.onerror(err, ctx);

      return this.compose(ctx)
        .then(respond)
        .catch(onerror);
    };
  }

  onerror(err, ctx) {
    if (err.code === "ENOENT") {
      ctx.status = 404;
    } else {
      ctx.status = 500;
    }
    let msg = err.message || "Internal error";
    ctx.res.end(msg);
    // 触发error事件
    this.emit("error", err);
  }

  /**
   * 构造ctx
   * @param {Object} req node req实例
   * @param {Object} res node res实例
   * @return {Object} ctx实例
   */
  createContext(req, res) {
    // 针对每个请求，都要创建ctx对象
    let ctx = Object.create(this.context);
    ctx.request = Object.create(this.request);
    ctx.response = Object.create(this.response);
    ctx.req = ctx.request.req = req;
    ctx.res = ctx.response.res = res;
    return ctx;
  }

  /**
   * 对客户端消息进行回复
   * @param {Object} ctx ctx实例
   */
  responseBody(ctx) {
    let content = ctx.body;
    if (typeof content === "string") {
      ctx.res.end(content);
    } else if (typeof content === "object") {
      ctx.res.end(JSON.stringify(content));
    }
  }
}

module.exports = Application;
