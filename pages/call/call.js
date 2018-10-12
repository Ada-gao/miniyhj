Page({
  data: {

  },
  onLoad: function(options) {

  },
  callPhone: function(e) {
    wx.makePhoneCall({
      phoneNumber: '18916797460',
    })
  },
})