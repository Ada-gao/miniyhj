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
  onLoad: function (options) {
    this.setData({
      groupId: options.id
    })
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
      res.data.content.forEach(item => {
        item.lastCallResult = util.transformText(that.data.resultsColumns, item.lastCallResult)
      })
      that.setData({
        list: res.data.content || []
      })
    }, false)
  },
})