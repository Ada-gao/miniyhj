var req = require('../../utils/request.js')
var utils = require('../../utils/utils.js')
var common = require('../../common/common.js')
const app = getApp()
Page({
  data: {
    companyName: '',
    userName: '',
    totalTaskCompleteCnt: 0,
    rate: 0,
    rank: 0,
  },
  onLoad: function(options) {
    let that = this
    that.setData({
      userName: app.globalData.name,
    })
    req.get('app/getLogoAndName', function(res) {
      that.setData({
        companyName: res.data.companyName
      })
    })
  },
  onShow: function() {
    let that = this
    req.get('task/statisBySales?userId=' + app.globalData.userId, function(res) {
      that.setData({
        totalTaskCompleteCnt: res.data.totalTaskCompleteCnt || 0,
        rate: utils.percent(res.data.totalTaskCompleteCnt, res.data.totalTaskCnt) || 0,
        rank: res.data.rank || 0
      })
    }, false)
  },
  openAbout: function(e) {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
  logout: function(e) {
    wx.showModal({
      title: '提示',
      content: '您确定要退出登录吗？',
      success: function(res) {
        if (res.confirm) {
          wx.reLaunch({
            url: '/pages/login/login',
          })
        }
      }
    })
  },
  onShareAppMessage: function () {
    return common.onShareAppMessage()
  }
})