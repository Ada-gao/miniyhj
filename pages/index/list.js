var req = require('../../utils/request.js')
var common = require('../../common/common.js')
var util = require('../../utils/util.js')
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
    req.get('task/getTaskInfo/' + that.data.groupId + '?pageSize=20&type=dnf&pageIndex=' + that.data.pageIndex, function(res) {
      let model = res.data
      let hasMore = true
      if (that.data.pageIndex >= model.totalPages -1) {
        hasMore = false
      }
      for (var index in model.content) {
        model.content[index].taskDate = util.formatTime(new Date(model.content[index].taskDate), '')
      }
      if (that.data.pageIndex > 0) {
        model.content = that.data.tasks.concat(model.content)
      }
      that.setData({
        tasks: model.content,
        hasMore: hasMore,
        pageIndex: that.data.pageIndex + 1,
      })
    }, true, function() {
      wx.stopPullDownRefresh();
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
      this.getData()
    }
  },
  openTask: function(e) {
    let taskId = e.currentTarget.dataset.taskid
    wx.navigateTo({
      url: '/pages/call/call?taskId=' + taskId,
    })
  },
  onShareAppMessage: function() {
    return common.onShareAppMessage()
  },
  back: function() {
    common.back()
  }
})