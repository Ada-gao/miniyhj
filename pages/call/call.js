Page({
  data: {

  },
  onLoad: function(options) {

  },
  callPhone: function(e) {
    wx.makePhoneCall({
      phoneNumber: '15623598264',
      success: function () {
        wx.navigateTo({
          url: '/pages/result/result',
        })
      }
    })
  },
})