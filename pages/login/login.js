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
      }, function (res){       
        wx.setStorageSync('token', res.data.token)
        app.globalData.token = wx.getStorageSync('token')
        req.get('api/app/me',function(res) {    
          console.log(res.data)
          app.globalData.companyId = res.data.companyId
          app.globalData.userId = res.data.id
          app.globalData.mobile = res.data.mobile
          app.globalData.name = res.data.name
          app.globalData.username = res.data.username
          //放在storage方便调试
          wx.setStorageSync('userInfo', {
            companyId: app.globalData.companyId,
            userId: app.globalData.userId,
            mobile: app.globalData.mobile,
            name: app.globalData.name,
            username: app.globalData.username
          })
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
  onShareAppMessage: function () {
    return {
      title: '闪电呼',
      path: '/pages/index/index'
    }
  },
  switchPwd: function(e) {
    if (this.data.isShowPassword) {
      this.setData({
        isShowPassword: false
      })
    } else {
      this.setData({
        isShowPassword: true
      })
    }
  }
})