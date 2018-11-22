var req = require('../../utils/request.js')
var common = require('../../common/common.js')
var util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    tasks: '',
    groupId: ''
  },
  onLoad: function (options) {
    let that = this
    that.setData({
      groupId: options.groupId
    })
  },
  onShow: function () {
    let that = this
    req.get('task/getTaskInfo/' + this.data.groupId + '?type=dnf', function (res) {
      let tasks = res.data
      for (var index in tasks) {
        tasks[index].taskDate = util.formatTime(new Date(tasks[index].taskDate), '')
      }
      that.setData({
        tasks: tasks
      })
    })
  },
  openTask: function (e) {
    let taskId = e.currentTarget.dataset.taskid
    wx.navigateTo({
      url: '/pages/call/call?taskId=' + taskId,
    })
  },
  onShareAppMessage: function () {
    return common.onShareAppMessage()
  },
  back: function () {
    common.back()
  }
})