var common = require('../../common/common.js')
Page({
  data: {

  },
  onLoad: function(options) {

  },
  formSubmit: function(e) {
    common.log(e)
  },
  getCode: function(e) {
    common.log(e)
  },
  onShareAppMessage: function() {
    return common.onShareAppMessage()
  },
  back: function() {
    common.back()
  }
})