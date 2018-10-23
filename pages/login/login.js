var req = require('../../utils/request.js')
var common = require('../../common/common.js')
const app = getApp()
Page({
  data: {
    redirect: '',
    isTab: false,
    isShowPassword: true
  },
  onLoad: function(options) {
    delete app.globalData.token
    delete app.globalData.companyId
    delete app.globalData.userId
    delete app.globalData.name
    delete app.globalData.username
    delete app.globalData.isCommit
    wx.clearStorageSync()
    this.setData({
      redirect: options.redirect || 'pages/index/index',
      isTab: options.isTab || true
    })
  },
  formSubmit: function(e) {
    let account = e.detail.value.account;
    let password = e.detail.value.password;
    if (account.length < 4) {
      common.showToast('用户名不合法')
    } else if (password.length < 6) {
      common.showToast('密码不合法')
    } else {
      let that = this
      req.post('auth/login', {
        username: account,
        password: password
      }, function(res) {
        common.saveToken(res.data.token)
        req.get('app/me', function(res) {
          common.saveUserInfo(res.data)
          if (that.data.isTab) {
            wx.switchTab({
              url: '/pages/index/index',
            })
          } else {
            wx.redirectTo({
              url: that.data.redirect
            })
          }
        })
      })
    }
  },
  switchPwd: function(e) {
    let isShowPassword = !this.data.isShowPassword
    this.setData({
      isShowPassword: isShowPassword
    })
  },
  openTrial: function() {
    wx.navigateTo({
      url: '/pages/trial/trial',
    })
  },
  onShareAppMessage: function() {
    return common.onShareAppMessage()
  }
})