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
    listQuery: {
      pageIndex: 0,
      pageSize: 10,
      type: 'dnf',
      createTime: ''
    },
    listQuery1: {
      pageIndex: 0,
      pageSize: 10,
      type: 'finish',
      createTime: ''
    },
    resultsColumns: [{
        label: '未外呼',
        value: 'NOT_CALL',
        id: 0
      },
      {
        label: '空号',
        value: 'NOT_EXIST',
        id: 1
      },
      {
        label: '未接通',
        value: 'UNCONNECTED',
        id: 2
      },
      {
        label: '已接通',
        value: 'CONNECTED',
        id: 3
      }
    ],
    list: [],
    list1: [],
    scrollTop: 0,
    scrollHeight: 0,
    hidden: true,
    isLast: false,
    isLast1: false,
    loadMore: false,
    loadMore1: false,
    totalPages: false,
    totalPages1: false,
    dnfFirstClick: true,
    finishFirstClick: true,
    dnfCount: 0,
    finishCount: 0
  },
  onLoad: function(options) {
    var that = this
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          scrollHeight: 824,
          groupId: options.groupId
        });
      }
    });
  },
  tabClick: function(e) {
    console.log(e)
    this.setData({
      activeIndex: e.currentTarget.id
    });
    if (this.data.activeIndex - 0 === 0) {
      this.data.listQuery.type = 'dnf'
      if (this.data.dnfFirstClick) this.onShow(this.data.activeIndex)
    } else if (this.data.activeIndex - 0 === 1) {
      this.data.listQuery1.type = 'finish'
      if (this.data.finishFirstClick) this.onShow(this.data.activeIndex)
    }
    this.data.loadMore = false
    this.data.loadMore1 = false
  },
  bindDateChange: function(e) {
    this.setData({
      initDate: e.detail.value,
      list: [],
      list1: [],
      listQuery: {
        pageIndex: 0,
        pageSize: 10,
        type: 'dnf',
        createTime: ''
      },
      listQuery1: {
        pageIndex: 0,
        pageSize: 10,
        type: 'finish',
        createTime: ''
      },
      dnfFirstClick: true,
      finishFirstClick: true
    })
    var riskType = this.data.activeIndex - 0 === 0 ? 'dnf' : 'finish'
    this.onShow(riskType)
  },
  bindLastDay: function() {
    var date = new Date(new Date(this.data.initDate).getTime() - 24 * 60 * 60 * 1000)
    this.setData({
      initDate: util.formatTime(date),
      totalPages: false,
      list: [],
      list1: [],
      dnfFirstClick: true,
      finishFirstClick: true
    })
    var riskType = this.data.activeIndex - 0 === 0 ? 'dnf' : 'finish'
    this.onShow(riskType)
  },
  bindNextDay: function() {
    var date1 = new Date(new Date(this.data.initDate).getTime() + 24 * 60 * 60 * 1000)
    this.setData({
      initDate: util.formatTime(date1),
      totalPages1: false,
      list: [],
      list1: [],
      dnfFirstClick: true,
      finishFirstClick: true
    })
    var riskType = this.data.activeIndex - 0 === 0 ? 'dnf' : 'finish'
    this.onShow(riskType)
  },
  onHide: function() {
    this.setData({
      list: [],
      list1: [],
      dnfFirstClick: true,
      finishFirstClick: true
      // activeIndex: 0
    })
  },
  onShow: function(riskType) {
    var that = this
    var data = that.data
    var listQuery = {}
    // common.log('activeIndex :' + this.data.activeIndex)
    if (this.data.activeIndex - 0 === 0) {
      riskType = 'dnf'
    } else if (this.data.activeIndex - 0 === 1) {
      riskType = 'finish'
    }
    listQuery.type = riskType
    if (listQuery.type !== 'finish') {
      listQuery = that.data.listQuery
    } else {
      listQuery = that.data.listQuery1
    }
    listQuery.createTime = data.initDate
    this.data.hidden = false
    req.get(`app/tasks/${data.groupId}?pageIndex=${listQuery.pageIndex}&pageSize=${listQuery.pageSize}&type=${listQuery.type}&createTime=${listQuery.createTime}`, function(res) {
      var content = res.data.content
      content.forEach(item => {
        item.lastCallResult = util.transformText(that.data.resultsColumns, item.lastCallResult)
      })
      that.data.hidden = true
      if (listQuery.type === 'dnf') {
        var list = that.data.list
        list = [...list, ...content]
        if (that.data.loadMore) {
          that.data.listQuery.pageIndex++
        } else {
          // list = content
        }
        that.setData({
          list: list,
          isLast: res.data.last,
          totalPages: res.data.totalPages ? false : true,
          dnfFirstClick: false,
          dnfCount: res.data.totalElements
        })
      } else {
        var list = that.data.list1
        if (!res.data.totalPages) {
          that.setData({
            totalPages1: true
          })
        }
        for (var i = 0; i < content.length; i++) {
          list.push(content[i])
        }
        if (that.data.loadMore1) {
          that.data.listQuery1.pageIndex++
        }
        that.setData({
          list1: list,
          isLast1: res.data.last,
          totalPages1: res.data.totalPages ? false : true,
          finishFirstClick: false,
          finishCount: res.data.totalElements
        })
      }
    }, false)
  },
  // 页面滑动到底部
  bindDownLoad: function(e) {
    if (e.currentTarget.dataset.type === 'dnf') {
      if (this.data.isLast) return
      this.data.loadMore = true
    } else {
      if (this.data.isLast1) return
      this.data.loadMore1 = true
    }
    this.onShow();
  },
  scroll: function(event) {
    //该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },
  topLoad: function(e) {
    //该方法绑定了页面滑动到顶部的事件，然后做上拉刷新
    // page = 0;
    if (e.currentTarget.dataset.type === 'dnf') {
      this.data.listQuery.pageIndex = 0
      this.data.listQuery.type = 'dnf'
      this.setData({
        list: [],
        scrollTop: 0
      });
    } else {
      this.data.listQuery1.pageIndex = 0
      this.data.listQuery1.type = 'finish'
      this.setData({
        list1: [],
        scrollTop: 0
      });
    }
    this.onShow();
  },
  loadingChange: function(falg) {
    this.setData({
      hidden: true
    });
  },
  onShareAppMessage: function () {
    return common.onShareAppMessage()
  },
  back: function () {
    common.back()
  }
})