var req = require('../../utils/request.js')
var utils = require('../../utils/utils.js')
const app = getApp()
Page({
  data: {
    callLogin: false,
    taskId: '',
    task: '',
    lastCallResult:'',
    icon:'',
    lastCallDate:''
  },
  onLoad: function(options) {
    let that = this
    console.log(options)
    if (options.id) {
      that.setData({
        taskId: options.id
      })
      console.log('获取任务详情')
      //获取任务详情
      req.get('api/task/statisGroup', function(res) {
       
      })
    } else {
      console.log('获取随机任务详情')
      //获取随机任务详情
      req.get('api/app/nextTask', function(res) {
        console.log(res.data)
        let lastCallResult = res.data.lastCallResult;
        let icon = ''
        if (lastCallResult === 'NOT_CALL'){
          lastCallResult = '未外呼'
          icon = '/image/icon_call_nocall.png'
        } else if (lastCallResult === 'CONNECTED') {
          lastCallResult = '已接通'
          icon = '/image/icon_call_call.png'
        }
        console.log(lastCallResult)
        that.setData({
          task: res.data,
          lastCallResult: lastCallResult,
          icon: icon,
          lastCallDate: new Date(res.data.lastCallDate).toLocaleDateString()
        })
      })
    }
  },
  callPhone: function(e) {
    let phneNo = this.data.task.phoneNo
    if (phneNo === '***********'){
      let callLogin = true
      req.post('/api/app/call?nameId=' + id + '&taskId=' + taskid, function (e) {

      })
      setTimeout(function () {
        wx.makePhoneCall({
          phoneNumber: '18916797460',

          success: function () {
            wx.navigateTo({
              url: '/pages/result/result',
            })
          }
        })
      },10000)
    }else{
      wx.makePhoneCall({
        phoneNumber: phneNo,
        success: function () {
          wx.navigateTo({
            url: '/pages/result/result',
          })
        }
      })
    }
  },
})