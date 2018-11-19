var req = require('../../utils/request.js')
var common = require('../../common/common.js')
const app = getApp()
var timer
Page({
  onLoad: function(options) {
    let that = this
    timer = setTimeout(function() {
      if (app.globalData.token && app.globalData.userId) {
        req.get('app/me', function(res) {
          common.saveUserInfo(res.data)
          wx.switchTab({
            url: '/pages/index/index',
          })
        }, false)
      } else {
        wx.reLaunch({
          url: '/pages/login/login',
        })
      }
    }, 2000)
  },
  onUnload: function() {
    clearTimeout(timer)
  },
  onShareAppMessage: function() {
    return common.onShareAppMessage()
  }
})