var req = require('../../utils/request.js')
var util = require('../../utils/util.js')
var common = require('../../common/common.js')
// const app = getApp()
Page({
  data: {
    tabs: [{
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
    initDate: util.formatTime(new Date()),
    groupId: '',
    dnfPageIndex: 0,
    finishPageIndex: 0,
    pageSize: 20,
    dnfType: 'dnf',
    finishType: 'finish',
    resultsColumns: [{
      label: '再次外呼',
      value: 'CALL_AGAIN',
      id: 0
    },
    {
      label: '放弃外呼',
      value: 'GIVE_UP',
      id: 1
    },
    {
      label: '继续跟进',
      value: 'FOLLOW',
      id: 2
    }
    ],
    dnfList: [],
    finishList: [],
    scrollHeight: 0,
    hidden: true,
    dnfLastNum: false,
    finishLastNum: false,
    loadMore: false,
    loadMore1: false,
    dnfNonePage: false,
    finishNonePage: false,
    dnfFirstClick: true,
    finishFirstClick: true,
    dnfCount: 0,
    finishCount: 0,
    finishReqComplete: true,
    dnfReqComplete: true,
    needRefresh: false
  },
  onLoad: function(options) {
    var that = this
    // console.log(wx.getSystemInfoSync().windowHeight)
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          scrollHeight: 900,
          groupId: options.groupId
        })
      }
    })
    this.getList('dnf')
    this.getList('finish')
  },
  tabClick: function(e) {
    this.setData({
      activeIndex: e.currentTarget.id,
      dnfList: [],
      finishList: [],
      dnfPageIndex: 0,
      finishPageIndex: 0
    })
    if (this.data.activeIndex - 0 === 0) {
      this.setData({
        dnfFirstClick: false
      })
    } else if (this.data.activeIndex - 0 === 1) {
      this.setData({
        finishFirstClick: false
      })
    }
    this.getList()
    this.data.loadMore = false
    this.data.loadMore1 = false
  },
  bindDateChange: function(e) {
    if (e) {
      this.setData({
        initDate: e.detail.value
      })
    }
    this.setData({
      dnfList: [],
      finishList: [],
      dnfPageIndex: 0,
      finishPageIndex: 0,
      dnfFirstClick: true,
      finishFirstClick: true
    })
    this.getList('dnf')
    this.getList('finish')
  },
  bindLastDay: function() {
    var date = new Date(new Date(this.data.initDate).getTime() - 24 * 60 * 60 * 1000)
    this.setData({
      initDate: util.formatTime(date),
      dnfNonePage: false,
      dnfList: [],
      finishList: [],
      dnfFirstClick: true,
      finishFirstClick: true,
      dnfPageIndex: 0,
      finishPageIndex: 0
    })
    this.getList('dnf')
    this.getList('finish')
  },
  bindNextDay: function() {
    var date1 = new Date(new Date(this.data.initDate).getTime() + 24 * 60 * 60 * 1000)
    this.setData({
      initDate: util.formatTime(date1),
      finishNonePage: false,
      dnfList: [],
      finishList: [],
      dnfFirstClick: true,
      finishFirstClick: true,
      dnfPageIndex: 0,
      finishPageIndex: 0
    })
    this.getList('dnf')
    this.getList('finish')
  },
  getList: function (taskType) {
    var that = this
    var pageIndex = 0
    var pageSize = this.data.pageSize
    var data = that.data
    if (!taskType) {
      taskType = this.data.activeIndex - 0 === 0 ? 'dnf' : 'finish'
    }
    pageIndex = taskType === 'dnf' ? that.data.dnfPageIndex : that.data.finishPageIndex
    if (taskType === 'dnf') {
      if (!that.data.dnfReqComplete) return
      that.setData({
        dnfReqComplete: false
      })
    } else {
      if (!that.data.finishReqComplete) return
      that.setData({
        finishReqComplete: false
      })
    }
    this.data.hidden = false
    req.get(`app/tasks/${data.groupId}?pageIndex=${pageIndex}&pageSize=${pageSize}&type=${taskType}&createTime=${data.initDate}`, function (res) {
      var content = res.data.content
      content.forEach(item => {
        item.status = util.transformText(that.data.resultsColumns, item.status)
      })
      that.data.hidden = true
      if (taskType === 'dnf') {
        var list = that.data.dnfList
        list = [...list, ...content]
        // if (that.data.dnfFirstClick) {
          that.setData({
            dnfPageIndex: that.data.dnfPageIndex + 1
          })
        // }
        that.setData({
          dnfList: list,
          dnfLastNum: res.data.last,
          dnfNonePage: res.data.totalPages ? false : true,
          dnfCount: res.data.totalElements,
          dnfReqComplete: true,
          dnfFirstClick: true
        })
      } else {
        var list = that.data.finishList
        list = [...list, ...content]
        // if (that.data.finishFirstClick) {
          that.setData({
            finishPageIndex: that.data.finishPageIndex + 1
          })
        // }
        that.setData({
          finishList: list,
          finishLastNum: res.data.last,
          finishNonePage: res.data.totalPages ? false : true,
          finishCount: res.data.totalElements,
          finishReqComplete: true,
          finishFirstClick: true
        })
      }
    })
  },
  // 页面滑动到底部
  bindDownLoad: function(e) {
    //该方法绑定了页面滑动到底部的事件，然后做上拉刷新
    if (e.currentTarget.dataset.type === 'dnf') {
      if (this.data.dnfLastNum) return
      this.data.loadMore = true
    } else {
      if (this.data.finishLastNum) return
      this.data.loadMore1 = true
    }
    this.getList()
  },
  // topLoad: function(e) {
  //   //该方法绑定了页面滑动到顶部的事件，然后做下拉刷新
  //   if (e.currentTarget.dataset.type === 'dnf') {
  //     this.data.dnfPageIndex = 0
  //     this.data.dnfType = 'dnf'
  //     this.setData({
  //       dnfList: []
  //     })
  //   } else {
  //     this.data.finishPageIndex = 0
  //     this.data.finishType = 'finish'
  //     this.setData({
  //       finishList: []
  //     })
  //   }
  //   this.getList()
  // },
  loadingChange: function(falg) {
    this.setData({
      hidden: true
    })
  },
  onPullDownRefresh: function () {
    console.log('下拉刷新')
    if (this.data.activeIndex - 0 === 'dnf') {
      this.data.dnfPageIndex = 0
      this.setData({
        dnfList: []
      })
    } else {
      this.data.finishPageIndex = 0
      this.setData({
        finishList: []
      })
    }
    this.getList()
    wx.stopPullDownRefresh()
  },
  onShareAppMessage: function () {
    return common.onShareAppMessage()
  },
  back: function () {
    common.back()
  }
})