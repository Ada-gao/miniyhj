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
    if (memo) {
      req.put('app/addCommon/' + that.data.taskId + '?common=' + memo, {}, function(res) {
        wx.navigateBack({
          delta: 1
        })
      })
    } else {
      common.showToast('请输入备注信息')
    }
  },
  onShareAppMessage: function() {
    return common.onShareAppMessage()
  },
  back: function() {
    common.back()
  }
})