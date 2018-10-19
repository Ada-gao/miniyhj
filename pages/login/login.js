// pages/login/login.js
var req = require('../../utils/request.js')
const app = getApp()
let Toast = require('../../utils/Toast.js')
Page({
  data: {
    redirect: '',
    isTab: false,
    isShowPassword: true
  },
  onLoad: function(options) {
    delete app.globalData.token
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
      Toast.show('用户名不合法')
    } else if (password.length < 6) {
      Toast.show('密码不合法')
    } else {
      let that = this
      req.post('/api/auth/login', {
        username: account,
        password: password
      }, function(res) {
        let token = res.data.token
        wx.setStorageSync('token', token)
        app.globalData.token = token
        req.get('api/app/me', function(res) {
          console.debug(JSON.stringify(res.data))
          let userinfo = res.data
          app.globalData.companyId = userinfo.companyId
          app.globalData.userId = userinfo.id
          app.globalData.name = userinfo.name
          app.globalData.username = userinfo.username
          //放在storage方便调试
          wx.setStorageSync('userInfo', userinfo)
          //获取完用户信息后才能跳转页面
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
  //分享
  onShareAppMessage: function() {
    return {
      title: '闪电呼',
      path: '/pages/index/index'
    }
  },
  switchPwd: function(e) {
    let isShowPassword = !this.data.isShowPassword
    this.setData({
      isShowPassword: isShowPassword
    })
  }
})