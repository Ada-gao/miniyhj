var req = require('../../utils/request.js')
var common = require('../../common/common.js')
const app = getApp()
Page({
  data: {
    userName: ''
  },
  onShow: function(options) {
    this.setData({
      userName: app.globalData.name,
    })
  },
  updateName: function() {
    wx.navigateTo({
      url: '/pages/setting/updateName',
    })
  },
  updatePwd: function() {
    wx.navigateTo({
      url: '/pages/setting/updatePwd',
    })
  },
  onShareAppMessage: function() {
    return common.onShareAppMessage()
  },
  back: function() {
    common.back()
  }
})