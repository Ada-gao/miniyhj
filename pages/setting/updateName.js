var req = require('../../utils/request.js')
var common = require('../../common/common.js')
const app = getApp()
Page({
  data: {
    userName: ''
  },
  onLoad: function (options) {
    let that = this
    that.setData({
      userName: app.globalData.name,
    })
  },
  formSubmit: function (e) {
    console.log(e.detail.value)
    let that = this
    req.put('app/addCommon/' + that.data.taskId, {
      common: e.detail.value.memo
    }, function (res) {
      wx.navigateBack({
        delta: 1
      })
    })
  },
  onShareAppMessage: function () {
    return common.onShareAppMessage()
  },
  back: function () {
    common.back()
  }
})