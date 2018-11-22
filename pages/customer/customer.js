var req = require('../../utils/request.js')
var common = require('../../common/common.js')
Page({
  data: {
    tabType: 'follow',
    followData:'',
    starData: '',
  },
  onShow: function() {
    this.getFollows()
    this.getStars()
  },
  getFollows: function() {
    let that = this
    req.get('task/getPotentialUser?type=follow', function(res) {
      that.setData({
        followData: res.data
      })
    })
  },
  getStars: function() {
    let that = this
    req.get('task/getPotentialUser?type=star', function(res) {
      that.setData({
        starData: res.data,
      })
    })
  },
  switchTab: function(e) {
    let tabType = e.currentTarget.dataset.type
    this.setData({
      tabType: tabType
    })
    if (tabType === 'follow') {
      this.getFollows()
    } else {
      this.getStars()
    }
  },
  openTask: function(e) {
    let taskId = e.currentTarget.dataset.taskid
    wx.navigateTo({
      url: '/pages/call/call?taskId=' + taskId,
    })
  },
  openSearch: function(e) {
    wx.navigateTo({
      url: '/pages/customer/search',
    })
  },
  onShareAppMessage: function() {
    return common.onShareAppMessage()
  },
  back: function() {
    common.back()
  }
})