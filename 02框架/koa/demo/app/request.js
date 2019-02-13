/*
 * @Author: atony2099
 * @Date: 2019-01-20 19:55:24
 * @Last Modified by: atony2099
 * @Last Modified time: 2019-01-20 20:04:21
 */

const url = require("url");

module.exports = {
  get query() {
    return url.parse(this.req.url);
  }
};
