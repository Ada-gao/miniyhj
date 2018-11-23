var req = require('../../utils/request.js')
var common = require('../../common/common.js')
Page({
  data: {
    taskId: null,
    memo: ''
  },
  onLoad: function(options) {
    this.setData({
      taskId: options.taskId,
      memo: options.memo
    })
  },
  formSubmit: function(e) {
    let that = this
    let memo = e.detail.value.memo
    req.put('app/addCommon/' + that.data.taskId, {
      common: memo
    }, function(res) {
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2];
      let task = prevPage.data.task
      task.common = memo
      prevPage.setData({
        task: task
      })
      wx.navigateBack({
        delta: 1
      })
    })
  },
  onShareAppMessage: function() {
    return common.onShareAppMessage()
  },
  back: function() {
    common.back()
  }
})