let isAbsoluteURL = require('./helpers/isAbsoluteURL.js')
let combineURLs = require('./helpers/combineURLs.js')
let Toast = require('./Toast.js')
let env = require('../config/env.js')
const baseURL = env.BASE_API
const app = getApp()

function get(url, success, showLoading = true, complete = function() {}) {
  request(url, {}, 'GET', success, showLoading, complete)
}

function post(url, data, success, showLoading = true, complete = function() {}) {
  request(url, data, 'POST', success, showLoading, complete)
}

function put(url, data, success, showLoading = true, complete = function() {}) {
  request(url, data, 'PUT', success, showLoading, complete)
}

function request(url, data, method, success, showLoading = true, complete) {
  var requestURL = url
  if (!isAbsoluteURL(url)) {
    requestURL = combineURLs(baseURL, url)
  }
  if (showLoading) {
    wx.showLoading()
  }
  console.debug(method + ' ' + requestURL)
  if (method === 'POST') {
    console.debug(data)
  }
  wx.request({
    url: requestURL,
    data: data,
    method: method,
    header: {
      'Authorization': app.globalData.token
    },
    success: function(res) {
      handleSuccess(res, success, showLoading)
    },
    fail: function(res) {
      handleFail(res)
    },
    complete: function(res) {
      handleComplete(res, complete)
    }
  })
}

function upload(url, file, success, showLoading = true, complete = function() {}) {
  var requestURL = url
  if (!isAbsoluteURL(url)) {
    requestURL = combineURLs(baseURL, url)
  }
  if (showLoading) {
    wx.showLoading()
  }
  console.debug('upload ' + requestURL)
  wx.uploadFile({
    url: requestURL,
    filePath: file,
    name: 'file',
    header: {
      'Authorization': app.globalData.token
    },
    success: function(res) {
      handleSuccess(res, success, showLoading)
    },
    fail: function(res) {
      handleFail(res)
    },
    complete: function(res) {
      handleComplete(res, complete)
    }
  })
}

//请求出错
function handleFail(res) {
  Toast.show(res.errMsg)
}

//请求成功
function handleSuccess(res, success, showLoading) {
  if (res.statusCode == 200) {
    if (showLoading) {
      wx.hideLoading()
    }
    if(success){
      success(res)
    }
  } else if (res.statusCode == 400) {
    Toast.show(res.data.error)
  } else if (res.statusCode == 401) {
    Toast.show('会话已过期，请重新登录。')
    wx.reLaunch({
      url: '/pages/login/login'
    })
  } else {
    Toast.show('服务器错误')
  }
}

//请求完成
function handleComplete(res, complete) {
  if(complete){
    complete(res)
  }
}

module.exports = {
  get: get,
  post: post,
  put: put,
  upload: upload,
}