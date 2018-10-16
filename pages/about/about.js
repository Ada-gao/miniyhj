Page({
  copy: function (e) {
    wx.setClipboardData({
      data: 'gh_374030c43f3c',
    })
    wx.showToast({
      title: '复制成功',
      icon: 'none',
      duration: 1500,
    })
  },
  back: function (e) {
    wx.navigateBack({
      delta: 1
    })
  },
})