var common = require('../../common/common.js')
Page({
  onShareAppMessage: function() {
    return common.onShareAppMessage()
  },
  back: function () {
    common.back()
  }
})