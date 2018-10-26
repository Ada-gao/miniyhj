var req = require('../../utils/request.js')
var utils = require('../../utils/utils.js')
var util = require('../../utils/util.js')
var common = require('../../common/common.js')
const app = getApp()
Page({
  data: {
    dailyTaskCompleteCnt: 0, //完成的数量
    dailyTaskCnt: 0, //总数量
    completeRate: 0, //完成率
    tasks: [],
    isComplete: false,
    showComplete: false,
    isReturn: false,
    current: 0
  },
  onLoad: function(options) {
    var that = this
    if (app.globalData.token) {
      that.setData({
        showComplete: wx.getStorageSync('isComplete')
      })
    } else {
      that.setData({
        isReturn: true
      })
      wx.redirectTo({
        url: '/pages/login/login?redirect=' + this.route + '&isTab=' + true
      })
    }
    if (wx.getStorageSync('isComplete')) {
      this.setData({
        showComplete: wx.getStorageSync('isComplete')
      })
    }
  },
  onShow: function() {
    var that = this
    if (that.data.isReturn) {
      return;
    }
    req.get('task/statisBySales?userId=' + app.globalData.userId, function(res) {
      let dailyTaskCnt = res.data.dailyTaskCnt || 0;
      let dailyTaskCompleteCnt = res.data.dailyTaskCompleteCnt || 0;
      let completeRate = dailyTaskCnt > 0 ? (dailyTaskCompleteCnt * 100 / dailyTaskCnt) : 0;
      that.setData({
        isLoading: true,
        completeRate: completeRate,
        dailyTaskCnt: dailyTaskCnt,
        dailyTaskCompleteCnt: dailyTaskCompleteCnt
      })
    }, false)
    req.get('task/statisGroup', function(res) {
      let tasks = res.data
      for (var index in tasks) {
        tasks[index].taskEndDate = util.formatTime(new Date(tasks[index].taskEndDate), '')
      }
      let current = that.data.current
      if (current >= tasks.length) {
        current = 0
      }
      that.setData({
        tasks: tasks,
        current: current
      })
    }, false)
    req.get('task/saleDailyCompleteStatus?userId=' + app.globalData.userId, function(res) {
      that.setData({
        isComplete: res.data
      })
      if (!wx.getStorageSync('clickComplete')) {
        wx.setStorageSync('isComplete', that.data.isComplete)
      }
      that.setData({
        showComplete: wx.getStorageSync('isComplete')
      })
    }, false)
  },
  //任务列表
  openTask: function(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/task/task?groupId=' + id,
    })
  },
  //任务详情
  openCall: function(e) {
    wx.navigateTo({
      url: '/pages/call/call',
    })
  },
  closeDialog: function() {
    wx.setStorageSync('isComplete', false)
    wx.setStorageSync('clickComplete', 1)
    this.setData({
      showComplete: false
    })
  },
  onShareAppMessage: function() {
    return common.onShareAppMessage()
  }
})