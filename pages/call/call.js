var req = require('../../utils/request.js')
var utils = require('../../utils/utils.js')
var util = require('../../utils/util.js')
var common = require('../../common/common.js')
const app = getApp()
var timer;
Page({
  data: {
    taskId: '',
    icon: '',
    lastCallResult: '',
    lastCallDate: '',
    task: '',
    isLoading: true,
    callSid: '',
    callLogin: false,
    formGroup: true,
    opacity: 0,
    winHeight: app.globalData.winHeight,
    openMemo:false,
  },
  onLoad: function(options) {
    let taskId = options.taskId
    if (taskId) {
      this.setData({
        formGroup: true,
        taskId: taskId
      })
    } else {
      this.setData({
        formGroup: false
      })
    }
  },
  onUnload: function() {
    if (app.globalData.isCommit) {
      delete app.globalData.isCommit
    }
  },
  onShow: function() {
    //如果是从备注页面回来则不刷新
    if (this.data.openMemo){
      this.setData({
        openMemo:false
      })
      return;
    }
    if (app.globalData.isCommit) {
      this.openResult()
      return
    }
    let url = 'app/miniProgram/nextTask'
    if (this.data.taskId) {
      url += '?taskId=' + this.data.taskId
    }
    let that = this
    req.get(url, function(res) {
      let task = res.data
      if (task) {
        let lastCallResult = '未外呼';
        let icon = '/image/icon_call_status_null.png'
        if (task.lastCallResult === 'CONNECTED') {
          lastCallResult = '已接通'
          icon = '/image/icon_call_status_success.png'
        } else if (task.lastCallResult === 'NOT_EXIST') {
          lastCallResult = '空号'
          icon = '/image/icon_call_status_fail.png'
        } else if (task.lastCallResult === 'UNCONNECTED') {
          lastCallResult = '未接通'
          icon = '/image/icon_call_status_fail.png'
        }
        that.setData({
          icon: icon,
          lastCallResult: lastCallResult,
          lastCallDate: util.formatTime(new Date(task.lastCallDate), 'time'),
          task: task,
          isLoading: false
        })
      }
    })
  },
  collectChange: function() {
    let that = this
    let task = that.data.task
    req.put('task/addStar/' + task.taskId + '?star=' + !task.star, {
      star: !task.star
    }, function(res) {
      task.star = !task.star
      that.setData({
        task: task
      })
      if (task.star) {
        common.showToast('已添加星标客户')
      } else {
        common.showToast('已取消星标客户')
      }
    })
  },
  scrollChange: function(e) {
    let opacity = e.detail.scrollTop / 150
    if (opacity > 1) {
      opacity = 1
    }
    this.setData({
      opacity: opacity
    })
  },
  callPhone: function(e) {
    let that = this
    let task = that.data.task
    if (task.phoneNo === '***********') {
      req.post('app/call?nameId=' + task.outboundNameId + '&taskId=' + task.taskId, {}, function(res) {
        that.setData({
          callSid: res.data.callSid,
          callLogin: true
        })
        timer = setTimeout(function() {
          that.setData({
            callLogin: false
          })
          that.openResult()
        }, 5000)
      })
    } else {
      that.openResult()
      wx.makePhoneCall({
        phoneNumber: task.phoneNo
      })
    }
  },
  openMemo: function() {
    this.setData({
      openMemo: true
    })
    let task = this.data.task
    let memo = task.common || ''
    wx.navigateTo({
      url: '/pages/memo/memo?taskId=' + task.taskId + '&memo=' + memo,
    })
  },
  openResult: function() {
    let task = JSON.parse(JSON.stringify(this.data.task))
    delete task.salesTalk //减少数据传递大小
    let url = '/pages/result/result?task=' + JSON.stringify(task) + '&formGroup=' + this.data.formGroup
    if (this.data.callSid) {
      url += '&callsid=' + this.data.callSid
    }
    wx.navigateTo({
      url: url,
    })
  },
  callRrturn: function() {
    let that = this
    req.get('call/' + that.data.callSid, function() {}, true, function(res) {
      that.setData({
        callLogin: false,
      })
      clearTimeout(timer)
    })
  },
  onShareAppMessage: function() {
    return common.onShareAppMessage()
  },
  back: function() {
    common.back()
  }
})