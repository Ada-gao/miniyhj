var req = require('../../utils/request.js')
var common = require('../../common/common.js')
const app = getApp()
Page({
  data: {
    type: '',
    keyword: '',
    pageIndex: 0,
    hasMore: true,
    list: ''
  },
  onLoad: function(options) {
    this.setData({
      type: options.type,
      keyword: options.keyword
    })
    this.getData()
  },
  getData: function() {
    let that = this
    req.get('task/getPotentialUser?pageSize=20&type=' + that.data.type + '&name=' + that.data.keyword + '&pageIndex=' + that.data.pageIndex, function(res) {
      let model = res.data
      let hasMore = true
      if (that.data.pageIndex >= model.totalPages - 1) {
        hasMore = false
      }
      if (that.data.pageIndex > 0) {
        model.content = that.data.list.concat(model.content)
      }
      that.setData({
        list: model.content,
        hasMore: hasMore,
        pageIndex: that.data.pageIndex + 1,
      })
    }, true, function() {
      wx.stopPullDownRefresh();
    })
  },
  openTask: function(e) {
    let taskId = e.currentTarget.dataset.taskid
    wx.navigateTo({
      url: '/pages/call/call?taskId=' + taskId,
    })
  },
  onPullDownRefresh: function() {
    this.setData({
      pageIndex: 0,
    })
    this.getData()
  },
  onReachBottom: function() {
    if (this.data.hasMore) {
      this.getData()
    }
  },
  onShareAppMessage: function() {
    return common.onShareAppMessage()
  },
  back: function() {
    common.back()
  }
})