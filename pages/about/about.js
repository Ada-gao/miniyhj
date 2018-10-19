let Toast = require('../../utils/Toast.js')
Page({
  copy: function(e) {
    wx.setClipboardData({
      data: 'gh_374030c43f3c',
      success: function() {
        Toast.show('复制成功')
      }
    })
  },
  //分享
  onShareAppMessage: function() {
    return {
      title: '闪电呼',
      path: '/pages/start/start'
    }
  },
  //返回
  back: function(e) {
    wx.navigateBack({
      delta: 1
    })
  },
})