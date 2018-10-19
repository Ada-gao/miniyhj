//app.js
App({
  onLaunch: function () {
    this.globalData.token = wx.getStorageSync('token')
    var userInfo = wx.getStorageSync('userInfo')
    this.globalData.companyId = userInfo.companyId
    this.globalData.userId = userInfo.id
    this.globalData.name = userInfo.name
    this.globalData.username = userInfo.username
  },
  globalData: {
    token: null,
    companyId: null,//公司Id
    userId: null,//用户id
    name: null,//用户昵称
    username:null,//用户名
    isCommit:false,//是否要提交数据
  },
  onPageNotFound(res) {
    wx.redirectTo({
      url: 'pages/404/404'
    })
  }
})