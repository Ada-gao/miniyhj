var req = require('../../utils/request.js')
var common = require('../../common/common.js')
Page({
  data: {

  },
  onLoad: function(options) {

  },
  onShareAppMessage: function() {
    return common.onShareAppMessage()
  },
  back: function() {
    common.back()
  }
})