Page({
  data: {
    callLogin: false
  },
  onLoad: function(options) {
    console.log(options.title)
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