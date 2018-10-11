//index.js
//获取应用实例
const app = getApp()

Page({
  data: {

  },
  onShow: function () {       
    if (!app.globalData.token) {
      wx.redirectTo({
        url: '/pages/login/login?redirect=' + this.route + '&isTab=' + true
      })
      return
    }
    
  }
})
