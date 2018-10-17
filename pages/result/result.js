var req = require('../../utils/request.js')
var utils = require('../../utils/utils.js')
let Toast = require('../../utils/Toast.js')
const app = getApp()
Page({
  data: {
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
    resultIndex: -1,
    actionColumns: [{
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
    actionIndex: -1,
    callStart: true,
    task: '',
    callsid: '',
    groupId: '',
    result: '',
    status: '',
    actualCallStartDate: '',
    acutalCallEndDate: '',
    outboundTaskId: '',
    common: '',
    duration: 0,
    contactName: '',
    phoneNo: '',
    wechatNo: ''
  },
  onLoad: function(data) {
    this.setData({
      task: JSON.parse(data.task),
      callsid: data.callsid,
      groupId: data.groupId,
      actualCallStartDate: new Date,
      acutalCallEndDate: new Date
    })
  },
  bindCountryChange: function(e) {
    let result = this.data.resultsColumns[e.detail.value].value
    this.setData({
      result: result,
      resultIndex: e.detail.value
    })
  },
  bindActionChange: function(e) {
    let status = this.data.actionColumns[e.detail.value].value
    this.setData({
      status: status,
      actionIndex: e.detail.value
    })
  },
  formSubmit: function(e) {
    let that = this
    if (that.data.result === '' || that.data.status === '') {
      Toast.show('标星为必填项')
    } else {
      that.setData({
        contactName: e.detail.value.contactName,
        mobileNo: e.detail.value.mobileNo,
        wechatNo: e.detail.value.wechatNo,
        common: e.detail.value.common
      })
      let phoneNo = that.data.task.phoneNo
      if (phoneNo === '***********') {
        let callsid = that.data.callsid
        req.get('api/app/callStatusResult/' + callsid, function (res) {
          that.setData({
            duration: res.data.duration
          })
          that.callResult(new Date(res.data.start), new Date(res.data.end))
        })
      } else {
        if (that.data.resultIndex == 3) {
          that.callResult(that.data.actualCallStartDate, new Date)
        } else {
          that.callResult(that.data.actualCallStartDate, that.data.acutalCallEndDate)
        }
      }
    }
  },
  callResult: function(start, end) {
    this.getCallMoney()
    let that = this
    req.post('api/app/tasks/history', {
      result: that.data.result,
      status: that.data.status,
      actualCallStartDate: start,
      acutalCallEndDate: end,
      outboundTaskId: that.data.task.taskId,
      common: that.data.common,
      callType: that.data.task.phoneNo.indexOf('*') > -1 ? 'THIRD_PLATFORM' : 'NATIVE',
      source: 'miniProgram'
    }, function(res) {
      that.outboundName()
    })
  },
  outboundName: function() {
    let that = this
    let id = that.data.task.outboundNameId
    req.put('api/app/outboundName/' + id, {
      contactName: that.data.contactName,
      gender: that.data.task.gender,
      mobileNo: that.data.mobileNo,
      wechatNo: that.data.wechatNo,
      age: that.data.task.age
    }, function(res) {
      that.goMessage()
    })
  },
  getCallMoney: function () {
    let that = this
    req.post('api/call/call/recordCallHistory', {
      callType: that.data.task.phoneNo.indexOf('*') > -1 ? 'THIRD_PLATFORM' : 'NATIVE',
      clientId: that.data.task.outboundNameId,
      clientName: that.data.task.contactName,
      duration: that.data.duration,
      phoneNum: that.data.task.phoneNo,
      saleId: app.globalData.id,
      source: 'miniProgram'
    }, function (res) {
    })
  },
  goMessage: function() {
    let that = this
    req.post('api/message/delaySend?companyId=' + app.globalData.companyId + '&outboundNameId=' + that.data.task.outboundNameId + '&userName=' + app.globalData.username + '&contactName=' + that.data.task.contactName, {}, function(res) {
      req.get('api/app/miniProgram/nextTask?groupId=' + that.data.groupId, function(res) {
        wx.switchTab({
          url: '/pages/index/index',
        })
        if (that.data.groupId) {
          wx.navigateTo({
            url: '/pages/task/task?groupId=' + that.data.groupId
          })
        }
        if (res.data) {
          wx.navigateTo({
            url: '/pages/call/call?groupId=' + that.data.groupId
          })
        }
      })
    })
  },
  //分享
  onShareAppMessage: function() {
    return {
      title: '闪电呼',
      path: '/pages/index/index'
    }
  },
})