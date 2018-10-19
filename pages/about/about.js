const app = getApp()
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
  //分享
  onShareAppMessage: function () {
    return {
      title: '闪电呼',
      path: '/pages/index/index'
    }
  },
  onShow: function () {
    if (app.globalData.commitData) {
      wx.navigateTo({
        url: app.globalData.commitData,
      })
    }
  },
  back: function (e) {
    wx.navigateBack({
      delta: 1
    })
  },
})