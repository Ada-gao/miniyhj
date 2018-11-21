var req = require('../../utils/request.js')
var common = require('../../common/common.js')
const app = getApp()
Page({
  data: {
    userName: ''
  },
  onShow: function () {
    this.setData({
      userName: app.globalData.name,
    })
  },
  formSubmit: function(e) {
    let name = e.detail.value.username
    if (name) {
      let that = this
      req.put('users/updateSaleName/' + app.globalData.userId + '?name='+name, {
        name: name
      }, function(res) {
        var user = wx.getStorageSync('userInfo')
        user.name = name
        common.saveUserInfo(user)
        common.back()
      })
    } else {
      common.showToast('请输入销售名称！')
    }
  },
  onShareAppMessage: function() {
    return common.onShareAppMessage()
  },
  back: function() {
    common.back()
  }
})