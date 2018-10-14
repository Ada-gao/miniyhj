// pages/me/me.js
var req = require('../../utils/request.js')
var utils = require('../../utils/utils.js')
const app = getApp()
Page({
  data: {
    companyName: '上海数赟信息科技有限公司',
    companyLogo: '/image/icon_me_avatar.png',
    userName: '',
    userId: -1,
    rank: 0,
    totalDuration: 0,
    totalTaskCompleteCnt: 0,
    totalTaskCnt: 0,
    rate: 0
  },
  onLoad: function (options) {
    let that = this

    // Get company name and Logo url,基本不变的放在onLoad方法内，只需一次加载
    req.get('/api/app/getLogoAndName',function(res) {    
      that.setData({
        companyName: res.data.companyName || that.data.companyName,
        companyLogo: utils.isNull(res.data.logo) ? that.data.companyLogo: res.data.logo
      })
    })
  },

  onShow: function () {
    this.setData({
      userName: app.globalData.name,
      userId: app.globalData.userId
    })

    let that = this
    req.get('api/task/statisBySales?userId='+this.data.userId,function(res){
      that.setData({
        rank: res.data.rank,
        totalDuration: res.data.totalDuration,
        totalTaskCompleteCnt: res.data.totalTaskCompleteCnt,
        totalTaskCnt: res.data.totalTaskCnt,
        rate: utils.percent(res.data.totalTaskCompleteCnt, res.data.totalTaskCnt)
      })
    })
  },
  openAbout: function (e) {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
  logout: function (e) {
    wx.showModal({
      title: '提示',
      content: '您确定要退出登录吗？',
      success:function(res){
        if(res.confirm){
           delete app.globalData.token
           wx.removeStorageSync('token')
           wx.reLaunch({
             url: '/pages/login/login',
           })
        }
      }
    })
  },
  onShareAppMessage: function () {
    return {
      title: '闪电呼',
      path: '/pages/index/index'
    }
  }
})