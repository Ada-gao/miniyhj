var req = require('../../utils/request.js')
var utils = require('../../utils/utils.js')
Page({
  data: {
    resultsColumns: [
      { label: '未外呼', value: 'NOT_CALL', id: 0 },
      { label: '空号', value: 'NOT_EXIST', id: 1 },
      { label: '未接通', value: 'UNCONNECTED', id: 2 },
      { label: '已接通', value: 'CONNECTED', id: 3 }
    ],
    resultIndex: -1,
    actionColumns: [
      { label: '再次外呼', value: 'CALL_AGAIN', id: 0 },
      { label: '放弃外呼', value: 'GIVE_UP', id: 1 },
      { label: '继续跟进', value: 'FOLLOW', id: 2 }
    ],
    actionIndex: -1,
    callStart: true,
    task:'',
    callsid: '',
    result: '',
    status: '',
    actualCallStartDate: new Date,
    acutalCallEndDate: '',
    outboundTaskId: '',
    common: ''
  },
  onLoad: function (data) {
    this.setData({
      task:JSON.parse(data.task),
      callsid:data.callsid
    })
    this.goMessage()
  },
  bindCountryChange: function (e) {
    let result = this.data.resultsColumns[e.detail.value].value
    this.setData({
      result: result,
      resultIndex: e.detail.value
    })
  },
  bindActionChange: function (e) {
    let status = this.data.actionColumns[e.detail.value].value
    this.setData({
      status: status,
      actionIndex: e.detail.value
    })
  },
  openToast: function () {
    let that = this
    let phoneNo = that.data.task.phoneNo
    console.log(that.data.task.wechatNo)
    // this.setData({
    //   wechatNo: that.data.task.wechatNo
    // })
    if (phoneNo === '***********') {
      let callsid = that.data.callsid
      req.get('api/app/callStatusResult/' + callsid, function (res) {
        that.callResult(res.data.start,res.data.end)
    })
    } else {
      let acutalCallEndDate = new Date()
      if (that.data.actionIndex === 3) {
        that.callResult(that.data.actualCallStartDate, acutalCallEndDate)
      } else {
        that.callResult(that.data.actualCallStartDate, that.data.actualCallStartDate)
      }
    }
  },
  hangUp: function () {
    this.setData({
      callStart: false
    })
  },
  callResult: function (start,end) {
    let that = this
    req.post('api/app/tasks/history', {
      result: that.data.result,
      status: that.data.status,
      actualCallStartDate: new Date(start),
      acutalCallEndDate: new Date(end),
      outboundTaskId: that.data.task.taskId,
      common: that.data.common,
      source: 'miniProgram'
    }, function (res) {
      that.outboundName()
    })
  },
  outboundName: function () {
    let that = this
    let id = that.data.task.outboundNameId
    req.put('api/app/outboundName/' + id,{
      contactName: that.data.task.contactName,
      gender: that.data.task.gender,
      mobileNo: that.data.task.mobileNo,
      wechatNo: that.data.wechatNo,
      age: that.data.task.age
    },function (res) {
      that.goMessage()
      wx.showToast({
        title: '提交成功',
        icon: 'success',
        duration: 2000
      });
      wx.navigateTo({
        url: 'pages/call/call'
      })
    })
  },
  goMessage: function () {
    let that = this
    req.post('api/message/delaySend?companyId=' + app.globalData.companyId + '&outboundNameId=' + that.data.task.outboundNameId + '&userName=' + app.globalData.username + '&contactName=' + that.data.task.contactName,function (res) {
    })
  }
})