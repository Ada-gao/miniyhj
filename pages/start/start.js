var req = require('../../utils/request.js')
var api = require('../../api/api.js')
const app = getApp()
var timer
Page({
  onLoad: function(options) {
    let that = this
    timer = setTimeout(function() {
      if (app.globalData.token && app.globalData.userId) {
        that.getUserInfo()
      } else {
        wx.reLaunch({
          url: '/pages/login/login',
        })
      }
    }, 1500)
  },
  onUnload: function() {
    clearTimeout(timer)
  },
  //获取用户信息
  getUserInfo: function() {
    let that = this
    req.get(api.me, function(res) {
      //保存token信息
      wx.setStorageSync('userInfo', JSON.stringify(res.data))
      app.globalData.userInfo = res.data
      wx.switchTab({
        url: '/pages/index/index',
      })
    }, false)
  },
  //分享
  onShareAppMessage: function() {
    return {
      title: '闪电呼',
      path: '/pages/start/start'
    }
  }
})