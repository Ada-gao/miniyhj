var common = require('../../common/common.js')
Page({
  copy: function(e) {
    wx.setClipboardData({
      data: 'gh_374030c43f3c',
      success: function() {
        common.showToast('复制成功')
      }
    })
  },
  onShareAppMessage: function() {
    return common.onShareAppMessage()
  },
  back: function() {
    common.back()
  },
})