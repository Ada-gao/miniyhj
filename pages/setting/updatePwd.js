var req = require('../../utils/request.js')
var common = require('../../common/common.js')
const app = getApp()
Page({
  formSubmit: function(e) {
    let password = e.detail.value.password
    if (password) {
      if (password.length >= 6) {
        if (password === e.detail.value.repassword) {
          let that = this
          req.put('users/resetPWD/' + app.globalData.userId + '?newPWD=' + password, {
            newPWD: password
          }, function(res) {
            wx.reLaunch({
              url: '/pages/login/login',
            })
          })
        } else {
          common.showToast('二次输入的密码不一致！')
        }
      } else {
        common.showToast('密码最少输入6位！')
      }
    } else {
      common.showToast('请输入新密码！')
    }
  },
  onShareAppMessage: function() {
    return common.onShareAppMessage()
  },
  back: function() {
    common.back()
  }
})