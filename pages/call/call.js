var req = require('../../utils/request.js')
var utils = require('../../utils/utils.js')
const app = getApp()
Page({
  data: {
    callLogin: false,
    task: '',
    lastCallResult: '',
    icon: '',
    lastCallDate: '',
    callSid: ''
  },
  onLoad: function(options) {
    let that = this
    // console.log(options)
    //获取随机任务详情
    let url = 'api/app/nextTask'
    if (options.groupId) {
      url += '?groupId=' + options.groupId + '&taskId=' + options.taskId
    }
    req.get(url, function(res) {
      console.log(res.data)
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
      // console.log(lastCallResult)
      that.setData({
        task: res.data,
        lastCallResult: lastCallResult,
        icon: icon,
        lastCallDate: new Date(res.data.lastCallDate).toLocaleDateString()
      })
    })
  },
  callPhone: function(e) {
    let that = this
    let phneNo = that.data.task.phoneNo
    if (phneNo === '***********'){
      this.setData({
        callLogin : true
      })
      // console.log(that.data.callLogin)
      let nameId = that.data.task.outboundNameId
      let taskId = that.data.task.taskId
      req.post('api/app/call?nameId=' + nameId + '&taskId=' + taskId, {
      },function (res) {
        this.setData({
          callSid: res.data.callSid
        })
        setTimeout(function(){
            that.setData({
            callLogin: false
          })
          wx.navigateTo({
            url: '/pages/result/result?task=' +JSON.stringify(that.data.task) + '&callsid=' + res.data.callSid,
          })
        },2000)
      })
    }else{
      wx.makePhoneCall({
        phoneNumber: phneNo,
        success: function() {
          wx.navigateTo({
            url: '/pages/result/result',
          })
        }
      })
    }
  },
  callRrturn: function () {
    let that = this
    let callSid = that.data.callSid 
    req.get('api/call/' + callSid, function () {
      this.setData({
        callLogin: false
      })
    })
  }
})