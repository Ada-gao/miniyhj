//app.js
App({
  onLaunch: function () {
    var token = wx.getStorageSync('token')
    this.globalData.token = token
    console.log('token:', token)
  },
  globalData: {
    token: null
  },
  onPageNotFound(res) {
    wx.redirectTo({
      url: 'pages/404/404'
    })
  }
})