var req = require('../../utils/request.js')
const app = getApp()
var timer
Page({
  onLoad: function(options) {
    let that = this
    timer = setTimeout(function() {
      if (app.globalData.token && app.globalData.userId) {
        req.get('/api/app/me', function (res) {
          //保存token信息
          let userinfo = res.data
          wx.setStorageSync('userInfo', userinfo)
          app.globalData.companyId = userinfo.companyId
          app.globalData.userId = userinfo.id
          app.globalData.name = userinfo.name
          app.globalData.username = userinfo.username
          wx.switchTab({
            url: '/pages/index/index',
          })
        }, false)
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
  //分享
  onShareAppMessage: function() {
    return {
      title: '闪电呼',
      path: '/pages/start/start'
    }
  }
})