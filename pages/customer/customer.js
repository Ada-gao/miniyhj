var req = require('../../utils/request.js')
var common = require('../../common/common.js')
Page({
  data: {
    tabType: 'follow',
    listData: '',
    pageIndex: 0,
    hasMore: true,
  },
  onLoad: function(options) {
    this.getData()
  },
  getData: function() {
    let that = this
    req.get('task/getPotentialUser?pageSize=20&type=' + that.data.tabType + '&pageIndex=' + that.data.pageIndex, function(res) {
      let model = res.data
      let hasMore = true
      if (that.data.pageIndex >= model.totalPages - 1) { 
        hasMore = false
      }
      if (that.data.pageIndex > 0) {
        model.content = that.data.listData.content.concat(model.content)
      }
      that.setData({
        listData: model,
        hasMore: hasMore,
        pageIndex: that.data.pageIndex + 1,
      })
    }, true, function () {
      wx.stopPullDownRefresh();
    })
  },
  onPullDownRefresh: function () {
    this.setData({
      pageIndex: 0,
    })
    this.getData()
  },
  onPageScroll: function (e) {
  },
  onReachBottom: function () {
    if (this.data.hasMore) {
      this.getData()
    }
  },
  switchTab: function(e) {
    this.setData({
      tabType: e.detail.tabType,
      pageIndex: 0
    })
    this.getData()
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