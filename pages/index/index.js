const app = getApp()
Page({
  data: {
    complete: 20, //完成的数量
    total: 120, //总数量
    completeRate: 0, //完成率
    screenWidth: 0, //屏幕宽度
    isLoading: false,
    isEmpty: true,
    tasks: [{
        id: 1,
        name: '某某某特惠产品',
        total: 88,
        num: 10,
        time: '2018.7.1'
      },
      {
        id: 2,
        name: '某某某特惠产品2',
        total: 22,
        num: 2,
        time: '2018.7.2'
      },
      {
        id: 3,
        name: '某某某特惠产品3',
        total: 33,
        num: 3,
        time: '2018.7.3'
      }
    ]
  },
  onLoad: function() {
    if (!app.globalData.token) {
      wx.redirectTo({
        url: '/pages/login/login?redirect=' + this.route + '&isTab=' + true
      })
      return
    }
    this.setData({
      isLoading: true,
      isEmpty: this.data.complete > 0 ? false : true,
      completeRate: this.data.complete * 100 / this.data.total,
    })
  },
  openTask: function(e) {
    wx.navigateTo({
      url: '/pages/task/task',
    })
  },
  openCall: function(e) {
    wx.navigateTo({
      url: '/pages/call/call',
    })
  },
})