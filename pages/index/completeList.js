var req = require('../../utils/request.js')
var common = require('../../common/common.js')
const app = getApp()
Page({
  data: {
    tasks: '',
    groupId: ''
  },
  onLoad: function(options) {
    let that = this
    that.setData({
      groupId: options.groupId
    })
  },
  onShow: function() {
    let that = this
    req.get('task/getTaskInfo/' + this.data.groupId + '?type=callAgain', function(res) {
      that.setData({
        tasks: res.data,
      })
    })
  },
  openTask: function(e) {
    let taskId = e.currentTarget.dataset.taskid
    wx.navigateTo({
      url: '/pages/call/call?groupId=' + this.data.groupId + '&taskId=' + taskId,
    })
  },
  onShareAppMessage: function() {
    return common.onShareAppMessage()
  },
  back: function() {
    common.back()
  }
})