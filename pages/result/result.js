var req = require('../../utils/request.js')
var utils = require('../../utils/utils.js')
let Toast = require('../../utils/Toast.js')
const app = getApp()
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
    groupId: '',
    result: '',
    status: '',
    actualCallStartDate: new Date,
    acutalCallEndDate: '',
    outboundTaskId: '',
    common: '',
    duration: 0,
    contactName: '',
    phoneNo: '',
    wechatNo: ''
  },
  onLoad: function (data) {
    this.setData({
      task:JSON.parse(data.task),
      callsid:data.callsid,
      groupId: data.groupId
    })
    // console.log(data.groupId)
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
  formSubmit: function (e) {
    let that = this
    that.setData({
      contactName: e.detail.value.contactName,
      mobileNo: e.detail.value.mobileNo,
      wechatNo: e.detail.value.wechatNo,
      common: e.detail.value.common
    })
    let phoneNo = that.data.task.phoneNo
    console.log(that.data.task.wechatNo)
    // this.setData({
    //   wechatNo: that.data.task.wechatNo
    // })
    if (that.data.result === '' || that.data.status === '') {
      Toast.show('标星为必填项')
    } else {
      if (phoneNo === '***********') {
        let callsid = that.data.callsid
        req.get('api/app/callStatusResult/' + callsid, function (res) {
          that.callResult(new Date(res.data.start), new Date(res.data.end))
          that.setData({
            duration: res.data.duration
          })
        })
      } else {
        // let acutalCallEndDate = new Date
        // console.log('状态' + that.data.resultIndex)
        if (that.data.resultIndex == 3) {
          that.callResult(that.data.actualCallStartDate, new Date())
        } else {
          that.callResult(that.data.actualCallStartDate, that.data.actualCallStartDate)
        }
      }
      that.getCallMoney()
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
      actualCallStartDate: start,
      acutalCallEndDate: end,
      outboundTaskId: that.data.task.taskId,
      common: that.data.common,
      callType: that.data.task.phoneNo.indexOf('*') > -1 ? 'THIRD_PLATFORM' : 'NATIVE',
      source: 'miniProgram'
    }, function (res) {
      that.outboundName()
    })
  },
  outboundName: function () {
    let that = this
    let id = that.data.task.outboundNameId
    req.put('api/app/outboundName/' + id,{
      contactName: that.data.contactName,
      gender: that.data.task.gender,
      mobileNo: that.data.mobileNo,
      wechatNo: that.data.wechatNo,
      age: that.data.task.age
    },function (res) {
      that.goMessage()
      wx.showToast({
        title: '提交成功',
        icon: 'success',
        duration: 2000
      });
      wx.redirectTo({
        url: '/pages/call/call?groupId=' + that.data.groupId
      })
    })
  },
  goMessage: function () {
    let that = this
    req.post('api/message/delaySend?companyId=' + app.globalData.companyId + '&outboundNameId=' + that.data.task.outboundNameId + '&userName=' + app.globalData.username + '&contactName=' + that.data.task.contactName,{},function (res) {
    })
  },
  getCallMoney: function () {
    let that = this
    // console.log('通话时长' + that.data.duration)
    req.post('api/call/call/recordCallHistory',{
      callType: that.data.task.phoneNo.indexOf('*') > -1 ? 'THIRD_PLATFORM' : 'NATIVE',
      clientId: that.data.task.outboundNameId,
      clientName: that.data.task.contactName,
      duration: that.data.duration,
      phoneNum: that.data.task.phoneNo,
      saleId: app.globalData.id,
      source: 'miniProgram'
    },function () {

    })
  }
})