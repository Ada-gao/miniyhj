let isAbsoluteURL = require('./helpers/isAbsoluteURL.js')
let combineURLs = require('./helpers/combineURLs.js')
let Toast = require('./Toast.js')
let env = require('../config/env.js')
const baseURL = env.BASE_API

function get(url, success, showLoading = true) {
  // TODO 此方法需要优化测试
  request(url, {}, 'GET', success, showLoading)
}

function post(url, data, success, showLoading = true) {
  request(url, data, 'POST', success, showLoading)
}

function request(url, data, method, success, showLoading = true) {
  var requestURL = url
  if (!isAbsoluteURL(url)) {
    requestURL = combineURLs(baseURL, url)
  }
  if (showLoading) {
    wx.showLoading()
  }
  console.debug(method + ' ' + requestURL)
  if (method === 'POST') console.debug(data)
  wx.request({
    url: requestURL,
    data: data,
    method: method,
    success: function(res) {
      if (res.statusCode == 200) {
        if (showLoading) {
          wx.hideLoading()
        }
        success(res)
      } else if (res.statusCode == 400) {
        Toast.show(res.data.error)
      } else if (res.statusCode == 401) {
        // TODO 待测试
        Toast.show('会话已过期，请重新登录。')
        wx.redirectTo({
          url: '/pages/login/login'
        })
      } else {
        Toast.show('未知错误。')       
      } 
    }   
  })
}

module.exports = { 
  get: get,
  post: post
}

