var req = require('../../utils/request.js')
var utils = require('../../utils/utils.js')
var util = require('../../utils/util.js')
var common = require('../../common/common.js')
const app = getApp()
var timer;
Page({
  data: {
    callLogin: false,
    task: '',
    lastCallResult: '',
    icon: '',
    lastCallDate: '',
    callSid: '',
    groupId: '',
    isLoading: false,
  },
  onLoad: function(options) {
    let that = this
    //获取随机任务详情
    let url = 'app/miniProgram/nextTask'
    if (options.groupId) {
      url += '?groupId=' + options.groupId
      if (options.taskId) {
        url += '&taskId=' + options.taskId
      }
      that.setData({
        groupId: options.groupId
      })
    }
    req.get(url, function(res) {
      let lastCallResult = res.data.lastCallResult;
      let icon = ''
      if (lastCallResult === 'NOT_CALL') {
        lastCallResult = '未外呼'
        icon = '/image/icon_call_status_null.png'
      } else if (lastCallResult === 'CONNECTED') {
        lastCallResult = '已接通'
        icon = '/image/icon_call_status_success.png'
      } else if (lastCallResult === 'NOT_EXIST') {
        lastCallResult = '空号'
        icon = '/image/icon_call_status_fail.png'
      } else if (lastCallResult === 'UNCONNECTED') {
        lastCallResult = '未接通'
        icon = '/image/icon_call_status_fail.png'
      }
      that.setData({
        isLoading: false,
        task: res.data,
        lastCallResult: lastCallResult,
        icon: icon,
        lastCallDate: util.formatTime(new Date(res.data.lastCallDate), 'time')
      })
    })
  },
  callPhone: function(e) {
    let that = this
    let phneNo = that.data.task.phoneNo
    if (phneNo === '***********') {
      let nameId = that.data.task.outboundNameId
      let taskId = that.data.task.taskId
      req.post('app/call?nameId=' + nameId + '&taskId=' + taskId, {}, function(res) {
        that.setData({
          callSid: res.data.callSid,
          callLogin: true
        })
        timer = setTimeout(function() {
          that.setData({
            callLogin: false
          })
          that.openResult()
        }, 10000)
      })
    } else {
      that.openResult()
      wx.makePhoneCall({
        phoneNumber: phneNo
      })
    }
  },
  openResult: function() {
    let url = '/pages/result/result'
    if (this.data.task) {
      let task = JSON.parse(JSON.stringify(this.data.task))
      delete task.common
      delete task.salesTalk
      url += '?task=' + JSON.stringify(task)
    }
    if (this.data.callSid) {
      url += '&callsid=' + this.data.callSid
    }
    if (this.data.groupId) {
      url += '&groupId=' + this.data.groupId
    }
    wx.navigateTo({
      url: url,
    })
  },
  callRrturn: function() {
    let that = this
    req.get('call/' + that.data.callSid, function() {
      that.setData({
        callLogin: false,
      })
      clearTimeout(timer)
    })
  },
  onShow: function() {
    if (app.globalData.isCommit) {
      this.openResult()
    }
  },
  onShareAppMessage: function () {
    return common.onShareAppMessage()
  },
  back: function () {
    common.back()
  }
})