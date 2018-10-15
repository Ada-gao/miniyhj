var req = require('../../utils/request.js')
var utils = require('../../utils/utils.js')
const app = getApp()
Page({
  data: {
    dailyTaskCompleteCnt: 0, //完成的数量
    dailyTaskCnt: 0, //总数量
    completeRate: 0, //完成率
    isLoading: false,
    tasks: [],
    isComplete: false
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
      let dailyTaskCnt = res.data.dailyTaskCnt;
      let dailyTaskCompleteCnt = res.data.dailyTaskCompleteCnt;
      let completeRate = dailyTaskCnt > 0 ? (dailyTaskCompleteCnt * 100 / dailyTaskCnt) : 0;
      that.setData({
        isLoading: true,
        completeRate: completeRate,
        dailyTaskCnt: dailyTaskCnt,
        dailyTaskCompleteCnt: dailyTaskCompleteCnt,
        isComplete: completeRate === 100
      })
    }, false)
    req.get('api/task/statisGroup', function(res) {
      for (var index in res.data) {
        res.data[index].taskEndDate = new Date(res.data[index].taskEndDate).toLocaleDateString()
      }
      that.setData({
        isLoading: true,
        tasks: res.data
      })
    }, false)
  },
  //任务列表
  openTask: function(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/task/task?id=' + id,
    })
  },
  //任务详情
  openCall: function(e) {
    wx.navigateTo({
      url: '/pages/call/call?title=' +1233,
    })
  },
  //分享
  onShareAppMessage: function() {
    return {
      title: '闪电呼',
      path: '/pages/index/index'
    }
  },
  openConfirm: function () {
    wx.showModal({
      title: '弹窗标题',
      content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
      confirmText: "主操作",
      cancelText: "辅助操作",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          console.log('用户点击主操作')
        } else {
          console.log('用户点击辅助操作')
        }
      }
    });
  },
  closeDialog: function () {
    this.setData({
      isComplete: false
    })
  }
})