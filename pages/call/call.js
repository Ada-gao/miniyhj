var req = require('../../utils/request.js')
var utils = require('../../utils/utils.js')
const app = getApp()
Page({
  data: {
    callLogin: false,
    task: '',
    lastCallResult: '',
    icon: '',
    lastCallDate: ''
  },
  onLoad: function(options) {
    let that = this
    console.log(options)
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
      console.log(lastCallResult)
      that.setData({
        task: res.data,
        lastCallResult: lastCallResult,
        icon: icon,
        lastCallDate: new Date(res.data.lastCallDate).toLocaleDateString()
      })
    })
  },
  callPhone: function(e) {
    // console.log(this.data.task)
    let phneNo = this.data.task.phoneNo
    if (phneNo === '***********'){
      let callLogin = true
      req.post('api/app/call?nameId=' + this.data.task.outboundNameId + '&taskId=' + this.data.task.taskId, function (res) {
        console.log(res)
        // console.log('成功')
      })
      // setTimeout(function () {
      // },10000)
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
})