const app = getApp()
Page({
  data: {
    complete: 20, //完成的数量
    total: 120, //总数量
    completeRate: 0,//完成率
    screenWidth: 0, //屏幕宽度
    isLoading:false,
    isEmpty:true
  },
  onLoad: function () {
    if (!app.globalData.token) {
      wx.redirectTo({
        url: '/pages/login/login?redirect=' + this.route + '&isTab=' + true
      })
      return
    }
    this.setData({
      isLoading:true,
      isEmpty: this.data.complete>0?false:true,
      completeRate: this.data.complete * 100 / this.data.total,
    })
   
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