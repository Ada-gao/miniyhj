//app.js
App({
  onLaunch: function () {
    var token = wx.getStorageSync('token')
    this.globalData.token = token
    console.log('token:', token)

    var userInfo = wx.getStorageSync('userInfo')
    this.globalData.companyId = userInfo.companyId
    this.globalData.userId = userInfo.userId
    this.globalData.mobile = userInfo.mobile
    this.globalData.name = userInfo.name
  },
  globalData: {
    token: null,
    companyId: null,
    userId: null,
    mobile: null,
    name: null
  },
  onPageNotFound(res) {
    wx.redirectTo({
      url: 'pages/404/404'
    })
  }
})