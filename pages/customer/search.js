var req = require('../../utils/request.js')
var common = require('../../common/common.js')
Page({
  data: {
    followList: '',
    starList: '',
    keyword: '',
    hasFollow: false,
    hasStar: false,
  },
  search: function(e) {
    let keyword = e.detail.value
    if (keyword) {
      this.setData({
        keyword: keyword
      })
      this.getFollows()
      this.getStars()
    } else {
      this.setData({
        followList: '',
        starList: '',
        keyword: ''
      })
    }
  },
  getFollows: function() {
    let that = this
    req.get('task/getPotentialUser?pageSize=5&type=follow&name=' + that.data.keyword, function(res) {
      that.setData({
        followList: res.data.content,
        hasFollow: res.data.totalPages > 1
      })
    })
  },
  getStars: function() {
    let that = this
    req.get('task/getPotentialUser?pageSize=5&type=star&name=' + that.data.keyword, function(res) {
      that.setData({
        starList: res.data.content,
        hasStar: res.data.totalPages > 1
      })
    })
  },
  openTask: function(e) {
    let taskId = e.currentTarget.dataset.taskid
    wx.navigateTo({
      url: '/pages/call/call?taskId=' + taskId,
    })
  },
  openMore: function(e) {
    let type = e.currentTarget.dataset.type
    wx.navigateTo({
      url: '/pages/customer/more?type=' + type + '&keyword=' + this.data.keyword,
    })
  },
  onShareAppMessage: function() {
    return common.onShareAppMessage()
  },
  back: function() {
    common.back()
  }
})