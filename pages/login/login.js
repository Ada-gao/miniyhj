// pages/login/login.js
const app = getApp()

Page({
  data: {
    redirect: '',
    isTab: false,
    phone: '',
    password: '',
    errorMsg: ''
  },
  onLoad: function(options) {
    this.setData({
      redirect: options.redirect || 'pages/index/index',
      isTab: options.isTab || true
    })
  },
  phoneInput: function(e) {
    this.setData({
      phone: e.detail.value,
      errorMsg: ''
    })
  },
  passwordInput: function(e) {
    this.setData({
      password: e.detail.value,
      errorMsg: ''
    })
  },
  //登录事件
  login: function(e) {
    // http request to get token  
    console.log('phone:' + this.data.phone)
    console.log('password:' + this.data.password)

    if (this.data.phone.length === 0 || this.data.password.lenght === 0) {
      this.setData({
        errorMsg: '用户名和密码不能为空！',
      })
    } else {
      let that = this

      //需要仿照axios进行抽象
      wx.request({
        url: 'http://47.99.32.117/api/auth/login',
        data: {
          username: this.data.phone,
          password: this.data.password
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
        }
      })     
    }
  }
})