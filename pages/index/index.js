// pages/index/index.js
const app = getApp()

Page({
  onShow: function () {
    console.log('token in index.js:' + app.globalData.token)
    if (!app.globalData.token) {
      wx.redirectTo({
        url: '/pages/login/login?redirect=' + this.route + '&isTab=' + true
      })
      return
    }
  },
  openTask: function (e) {
    wx.showToast({
      title: '查看任务',
      icon: 'none',
      duration: 1500,
    })
    wx.navigateTo({
      url: '/pages/task/task',
    })
  },
  openCall: function (e) {
    wx.showToast({
      title: '开始外呼',
      icon: 'none',
      duration: 1500,
    })
    wx.navigateTo({
      url: '/pages/call/call',
    })
  }
})
