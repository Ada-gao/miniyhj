Page({
  data: {
  },
  onLoad: function () {

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
  },
})