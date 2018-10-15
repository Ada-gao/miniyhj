const app = getApp()
var req = require('../../utils/request.js')
var utils = require('../../utils/utils.js')
Page({
  data: {
    complete: 20, //完成的数量
    total: 120, //总数量
    completeRate: 0, //完成率
    screenWidth: 0, //屏幕宽度
    isLoading: false,
    isEmpty: true,
    tasks: []
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
  onShow: function() {
    var that = this
    req.get('api/task/statisGroup',function(res) {
      let tasks = res.data.map(function(task) {
        return {
          'id': task.taskGroupId,
          'name': task.taskName,
          'total': task.totalTaskCnt,
          'toFinish': task.totalTaskCnt - task.totalTaskCompleteCnt,
          'time': new Date(task.taskEndDate).toLocaleDateString()
        }
      })     
      that.setData({
        tasks: tasks
      })
    })
  },
  openTask: function(e) {
    wx.navigateTo({
      url: '/pages/task/task',
    })
  },
  openCall: function(e) {
    wx.navigateTo({
      url: '/pages/call/call?title=' +1233,
    })
  },
  onShareAppMessage: function () {
    return {
      title: '闪电呼',
      path: '/pages/index/index'
    }
  }
})