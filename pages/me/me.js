// pages/me/me.js
const app = getApp()
Page({
  openAbout: function (e) {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
  logout: function (e) {
    wx.showModal({
      title: '提示',
      content: '您确定要退出登录吗？',
      success:function(res){
        if(res.confirm){
           delete app.globalData.token
           wx.removeStorageSync('token')
           wx.reLaunch({
             url: '/pages/login/login',
           })
        }
      }
    })
  }
})