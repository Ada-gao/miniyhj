var req = require('../../utils/request.js')
var common = require('../../common/common.js')
const app = getApp()
Page({
  data: {
    tasks: '',
    groupId: '',
    pageIndex: 0,
    hasMore: true,
  },
  onLoad: function(options) {
    this.setData({
      groupId: options.groupId
    })
    this.getData()
  },
  getData: function() {
    let that = this
    req.get('task/getTaskInfo/' + that.data.groupId + '?pageSize=20&type=callAgain&pageIndex=' + that.data.pageIndex, function(res) {
      let tasks = res.data
      let hasMore = true
      if (tasks.length < 20) { //这样判断不是很准确，需要后台返回对应字段
        hasMore = false
      }
      if (that.data.pageIndex > 0) {
        tasks = that.data.tasks.concat(tasks)
      }
      that.setData({
        tasks: tasks,
        hasMore: hasMore
      })
    }, true, function() {
      wx.stopPullDownRefresh();
    })
  },
  openTask: function(e) {
    let taskId = e.currentTarget.dataset.taskid
    wx.navigateTo({
      url: '/pages/call/call?taskId=' + taskId,
    })
  },
  onPullDownRefresh: function() {
    this.setData({
      pageIndex: 0,
    })
    this.getData()
  },
  onReachBottom: function() {
    if (this.data.hasMore) {
      this.setData({
        pageIndex: this.data.pageIndex + 1,
      })
      this.getData()
    }
  },
  onShareAppMessage: function() {
    return common.onShareAppMessage()
  },
  back: function() {
    common.back()
  }
})