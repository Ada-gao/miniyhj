var req = require('../../utils/request.js')
var utils = require('../../utils/utils.js')
var util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    callLogin: false,
    task: '',
    lastCallResult: '',
    icon: '',
    lastCallDate: '',
    callSid: '',
    groupId: '',
    isLoading: false
  },
  onLoad: function(options) {
    let that = this
    //获取随机任务详情
    let url = 'api/app/miniProgram/nextTask'
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
        isLoading:false,
        task: res.data,
        lastCallResult: lastCallResult,
        icon: icon,
        lastCallDate: util.formatTime(new Date(res.data.lastCallDate), '')
      })
    })
  },
  callPhone: function(e) {
    let that = this
    let phneNo = that.data.task.phoneNo
    if (phneNo === '***********') {
      let nameId = that.data.task.outboundNameId
      let taskId = that.data.task.taskId
      req.post('api/app/call?nameId=' + nameId + '&taskId=' + taskId, {}, function(res) {
        that.setData({
          callSid: res.data.callSid,
          callLogin: true
        })
        setTimeout(function() {
          if (that.data.callLogin){
            wx.reLaunch({
              url: '/pages/result/result?task=' + JSON.stringify(that.data.task) + '&callsid=' + res.data.callSid + '&groupId=' + that.data.groupId,
            })
          }
        }, 5000)
      })
    } else {
      wx.reLaunch({
        url: '/pages/result/result?task=' + JSON.stringify(that.data.task) + '&callsid=' + 0 + '&groupId=' + that.data.groupId,
      })
      wx.makePhoneCall({
        phoneNumber: phneNo
      })
    }
  },
  callRrturn: function() {
    let that = this
    req.get('api/call/' + that.data.callSid, function() {
      that.setData({
        callLogin: false,
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
  back: function(e) {
    wx.navigateBack({
      delta: 1
    })
  }
})