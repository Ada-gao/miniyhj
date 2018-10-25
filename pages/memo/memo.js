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
    req.put('app/addCommon/' + that.data.taskId, {
      common: e.detail.value.memo
    }, function(res) {
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