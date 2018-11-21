var req = require('../../utils/request.js')
var common = require('../../common/common.js')
Page({
  data: {
    tabType: '',
    followList: '',
    starList: '',
  },
  onShow: function() {
    if (this.data.tabType) {
      if (this.data.tabType === 'follow') {
        this.getFollows()
      } else {
        this.getStars()
      }
    } else {
      this.setData({
        tabType: 'follow'
      })
      this.getFollows()
      this.getStars()
    }
  },
  getFollows: function() {
    let that = this
    req.get('task/getPotentialUser?type=follow', function(res) {
      that.setData({
        followList: res.data.content,
      })
    })
  },
  getStars: function() {
    let that = this
    req.get('task/getPotentialUser?type=star', function(res) {
      that.setData({
        starList: res.data.content,
      })
    })
  },
  switchTab: function(e) {
    let tabType = e.currentTarget.dataset.type
    this.setData({
      tabType: tabType
    })
    this.onShow()
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