const app = getApp()
var req = require('../../utils/request.js')
var utils = require('../../utils/utils.js')
Page({
  data: {
    dailyTaskCompleteCnt: 0, //完成的数量
    dailyTaskCnt: 0, //总数量
    completeRate: 0, //完成率
    isLoading: false,
    tasks: []
  },
  onLoad: function() {
    if (!app.globalData.token) {
      wx.redirectTo({
        url: '/pages/login/login?redirect=' + this.route + '&isTab=' + true
      })
      return;
    }
  },
  onShow: function() {
    var that = this
    req.get('api/task/statisBySales?userId=' + app.globalData.userId, function(res) {
      let completeRate = res.data.dailyTaskCnt > 0 ? (res.data.dailyTaskCompleteCnt * 100 / res.data.dailyTaskCnt) : 0;
      that.setData({
        isLoading: true,
        completeRate: completeRate
      })
    })
    req.get('api/task/statisGroup', function(res) {
      for (var index in res.data) {
        res.data[index].taskEndDate = new Date(res.data[index].taskEndDate).toLocaleDateString()
      }
      that.setData({
        isLoading: true,
        tasks: res.data
      })
    })
  },
  //任务列表
  openTask: function(e) {
    wx.navigateTo({
      url: '/pages/task/task',
    })
  },
  //任务详情
  openCall: function(e) {
    wx.navigateTo({
      url: '/pages/call/call',
    })
  },
  //分享
  onShareAppMessage: function() {
    return {
      title: '闪电呼',
      path: '/pages/index/index'
    }
  }
})