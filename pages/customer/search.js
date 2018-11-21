var req = require('../../utils/request.js')
var common = require('../../common/common.js')
Page({
  data: {
    followList: '',
    starList: '',
  },
  search: function(e) {
    let keyword = e.detail.value
    if (keyword) {
      this.getFollows(keyword)
      this.getStars(keyword)
    } else {
      this.setData({
        followList: '',
        starList: ''
      })
    }
  },
  getFollows: function(name) {
    let that = this
    req.get('task/getPotentialUser?type=follow&name=' + name, function(res) {
      that.setData({
        followList: res.data.content,
      })
    })
  },
  getStars: function(name) {
    let that = this
    req.get('task/getPotentialUser?type=star&name=' + name, function(res) {
      that.setData({
        starList: res.data.content,
      })
    })
  },
  openTask: function(e) {
    let taskId = e.currentTarget.dataset.taskid
    wx.navigateTo({
      url: '/pages/call/call?taskId=' + taskId,
    })
  },
  onShareAppMessage: function() {
    return common.onShareAppMessage()
  },
  back: function() {
    common.back()
  }
})