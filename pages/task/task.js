// pages/task/task.js
var req = require('../../utils/request.js')
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        label: '未完成',
        value: 'dnf',
        id: 0
      },
      {
        label: '已完成',
        value: 'finish',
        id: 1
      }
    ],
    activeIndex: 0,
    // initDate: new Date().toLocaleDateString(),
    initDate: '2018-10-15',
    groupId: '',
    listQuery: {
      pageIndex: 0,
      pageSize: 10,
      type: 'dnf',
      createTime: ''
    },
    date: '2016-09-01',
    resultsColumns: [
      { label: '未外呼', value: 'NOT_CALL', id: 0 },
      { label: '空号', value: 'NOT_EXIST', id: 1 },
      { label: '未接通', value: 'UNCONNECTED', id: 2 },
      { label: '已接通', value: 'CONNECTED', id: 3 }
    ],
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.groupId = options.id
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
      }
    });
  },
  tabClick: function (e) {
    this.data.listQuery.type = e.currentTarget.dataset.type
    this.setData({
    //   sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    this.onShow()
  },
  bindDateChange: function (e) {
    this.setData({
      initDate: e.detail.value
    })
    this.onShow()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    var data = that.data
    var listQuery = that.data.listQuery
    listQuery.createTime = data.initDate
    req.get(`api/app/tasks/${data.groupId}?pageIndex=${listQuery.pageIndex}&pageSize=${listQuery.pageSize}&type=${listQuery.type}&createTime=${listQuery.createTime}`, function (res) {
      res.data.content.forEach(item => {
        item.lastCallResult = util.transformText(that.data.resultsColumns, item.lastCallResult)
      })
      that.setData({
        list: res.data.content || []
      })
    }, false)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})