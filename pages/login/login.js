// pages/login/login.js
const app = getApp()

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
    if (account.length === 0) {
      wx.showToast({
        title: '用户名不能为空',
        icon: 'none',
        duration: 1500,
      })
    } else if (password.length === 0) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        duration: 1500,
      })
    } else {
      wx.showLoading()
      let that = this
      
      //需要仿照axios进行抽象
      wx.request({
        url: 'http://47.99.32.117/api/auth/login',
        data: {
          username: account,
          password: password
        },
        method: 'POST',
        success(res) {
          console.log(res.statusCode)
          if(res.statusCode !== 200) {
            that.setData({
              errorMsg: res.data.error
            })
            return
          }
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
          wx.hideLoading()
        }         
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