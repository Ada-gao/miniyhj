// pages/me/me.js
const app = getApp()
Page({
  data: {

  },
  //事件处理函数
  logout: function(e) {
    // http request to get token
    delete app.globalData.token
    wx.removeStorageSync('token')
    wx.redirectTo({
      url: '/pages/login/login'
    })
  }
})