/*
 * @Author: atony2099
 * @Date: 2019-01-20 20:15:04
 * @Last Modified by: atony2099
 * @Last Modified time: 2019-01-20 20:15:36
 */

// context.js
module.exports = {
  get query() {
    return this.request.query;
  },

  get body() {
    return this.response.body;
  },

  set body(data) {
    this.response.body = data;
  },

  get status() {
    return this.response.status;
  },

  set status(statusCode) {
    this.response.status = statusCode;
  }
};
