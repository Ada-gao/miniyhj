var req = require('../../utils/request.js')
var common = require('../../common/common.js')
Page({
  data: {
    tasks: [{ "source": "自有", "duration": 0, "salesTalk": "尊敬的客户，您好：\n我向你推荐一款摇钱树产品", "taskName": "汤臣一期销售", "maskPhoneNo": false, "phoneNo": "17612161114", "createTime": 1538210593000, "productName": "摇钱树", "lastCallDate": 1539931947000, "taskId": 7, "gender": "GENTLEMAN", "age": "18岁以下", "outboundTaskGroupId": 2, "minimumDuration": 1, "taskDate": 1540104764000, "outboundNameId": 7, "mobileNo": "", "wechatNo": "", "contactName": "刘龙", "callCount": 38, "lastCallResult": "NOT_EXIST", "status": "CALL_AGAIN", "userId": 2, "common": "xxx" }, { "source": "自有", "duration": 0, "salesTalk": "尊敬的客户，您好：\n我向你推荐一款摇钱树产品", "taskName": "汤臣一期销售", "maskPhoneNo": false, "phoneNo": "17612161114", "createTime": 1538210593000, "productName": "摇钱树", "lastCallDate": 1539931947000, "taskId": 7, "gender": "GENTLEMAN", "age": "18岁以下", "outboundTaskGroupId": 2, "minimumDuration": 1, "taskDate": 1540104764000, "outboundNameId": 7, "mobileNo": "", "wechatNo": "", "contactName": "刘龙", "callCount": 38, "lastCallResult": "NOT_EXIST", "status": "CALL_AGAIN", "userId": 2, "common": "xxx" }, { "source": "自有", "duration": 0, "salesTalk": "尊敬的客户，您好：\n我向你推荐一款摇钱树产品", "taskName": "汤臣一期销售", "maskPhoneNo": false, "phoneNo": "17612161114", "createTime": 1538210593000, "productName": "摇钱树", "lastCallDate": 1539931947000, "taskId": 7, "gender": "GENTLEMAN", "age": "18岁以下", "outboundTaskGroupId": 2, "minimumDuration": 1, "taskDate": 1540104764000, "outboundNameId": 7, "mobileNo": "", "wechatNo": "", "contactName": "刘龙", "callCount": 38, "lastCallResult": "NOT_EXIST", "status": "CALL_AGAIN", "userId": 2, "common": "xxx" }, { "source": "自有", "duration": 0, "salesTalk": "尊敬的客户，您好：\n我向你推荐一款摇钱树产品", "taskName": "汤臣一期销售", "maskPhoneNo": false, "phoneNo": "17612161114", "createTime": 1538210593000, "productName": "摇钱树", "lastCallDate": 1539931947000, "taskId": 7, "gender": "GENTLEMAN", "age": "18岁以下", "outboundTaskGroupId": 2, "minimumDuration": 1, "taskDate": 1540104764000, "outboundNameId": 7, "mobileNo": "", "wechatNo": "", "contactName": "刘龙", "callCount": 38, "lastCallResult": "NOT_EXIST", "status": "CALL_AGAIN", "userId": 2, "common": "xxx" }]
  },
  onLoad: function (options) {
  },
  openTask: function (e) {
    wx.navigateTo({
      url: '/pages/call/call?groupId=2&taskId=7',
    })
  },
  onShareAppMessage: function () {
    return common.onShareAppMessage()
  },
  back: function () {
    common.back()
  }
})