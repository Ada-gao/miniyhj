Page({
  data: {
  },
  onLoad: function () {

  },
  openAbout: function (e) {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
  loginOut: function (e) {
    wx.showModal({
      title: '提示',
      content: '您确定要退出登录吗？',
      success:function(res){
        if(res.confirm){
          wx.reLaunch({
            url: '/pages/login/login',
          })
        }
      }
    })
  }
})