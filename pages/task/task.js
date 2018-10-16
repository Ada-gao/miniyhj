var req = require('../../utils/request.js')
var util = require('../../utils/util.js')
Page({
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
    initDate: util.formatTime(new Date()),
    groupId: '',
    listQuery: {
      pageIndex: 0,
      pageSize: 10,
      type: 'dnf',
      createTime: ''
    },
    resultsColumns: [
      { label: '未外呼', value: 'NOT_CALL', id: 0 },
      { label: '空号', value: 'NOT_EXIST', id: 1 },
      { label: '未接通', value: 'UNCONNECTED', id: 2 },
      { label: '已接通', value: 'CONNECTED', id: 3 }
    ],
    list: [],
    scrollTop: 0,
    scrollHeight: 0,
    hidden: true,
    isLast: false,
    isLast1: false
  },
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success: function(res) {
        console.log(res.windowHeight)
        that.setData({
          scrollHeight: 824,
          groupId: options.id
        });
      }
    });
    // this.setData({
    //   groupId: options.id
    // })
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
  onShow: function () {
    var that = this
    var data = that.data
    var listQuery = that.data.listQuery
    listQuery.createTime = data.initDate
    req.get(`api/app/tasks/${data.groupId}?pageIndex=${listQuery.pageIndex}&pageSize=${listQuery.pageSize}&type=${listQuery.type}&createTime=${listQuery.createTime}`, function (res) {
      var list = that.data.list
      if (res.data.last) {
        that.setData({
          isLast: true
        })
      }
      res.data.content.forEach(item => {
        item.lastCallResult = util.transformText(that.data.resultsColumns, item.lastCallResult)
      })
      for(var i =0; i < res.data.content.length; i++) {
        list.push(res.data.content[i])
      }
      that.setData({
        list: list
      })
      that.data.listQuery.pageIndex++
      that.setData({
        hidden: true
      })
    }, false)
  },
  //页面滑动到底部
   bindDownLoad: function() {
    var that = this;
     if (that.data.isLast) return
    that.onShow();
    console.log("lower");
  },
  scroll: function (event) {
    //该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
    this.setData({
      scrollTop : event.detail.scrollTop
    });
  },
  topLoad: function(event) {
    //该方法绑定了页面滑动到顶部的事件，然后做上拉刷新
    page = 0;
    this.setData({
      list : [],
      scrollTop : 0
    });
    that.onShow();
    console.log("lower");
  },
  back: function (e) {
    wx.navigateBack({
      delta: 1
    })
  },
})