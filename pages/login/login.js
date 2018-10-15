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
        if (that.data.isTab) {
          wx.switchTab({
            url: "/" + that.data.redirect
          })
        } else {
          wx.navigateTo({
            url: that.data.redirect
          })
        }
        req.get('api/app/me',function(res) {    
          app.globalData.companyId = res.data.companyId
          app.globalData.userId = res.data.id
          app.globalData.mobile = res.data.mobile
          app.globalData.name = res.data.name
          //放在storage方便调试
          wx.setStorageSync('userInfo', {
            companyId: app.globalData.companyId,
            userId: app.globalData.userId,
            mobile: app.globalData.mobile,
            name: app.globalData.name,
          })
        })
      })      
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