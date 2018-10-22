//app.js
(function() {
  const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
  }
  var formatTime = function(date, dateType) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    const milliseconds = date.getMilliseconds()
    let timeStr = ''
    if (dateType === 'time') {
      timeStr = [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second, milliseconds].map(formatNumber).join(':')
    } else {
      timeStr = [year, month, day].map(formatNumber).join('-')
    }
    return timeStr
  }

  var consolelog = console.log
  console.log = function() {
    Array.prototype.unshift.call(arguments, 'L', formatTime(new Date(), 'time'))
    consolelog.apply(this, arguments)
  }

  var consoledebug = console.debug
  console.debug = function() {
    Array.prototype.unshift.call(arguments, 'D', formatTime(new Date(), 'time'));
    consoledebug.apply(this, arguments);
  }

  var consoleinfo = console.info
  console.info = function() {
    Array.prototype.unshift.call(arguments, 'I', formatTime(new Date(), 'time'));
    consoleinfo.apply(this, arguments);
  }

  var consolewarn = console.warn
  console.warn = function() {
    Array.prototype.unshift.call(arguments, 'W', formatTime(new Date(), 'time'));
    consolewarn.apply(this, arguments);
  }

  var consoleerror = console.error
  console.error = function() {
    Array.prototype.unshift.call(arguments, 'E', formatTime(new Date(), 'time'));
    consoleerror.apply(this, arguments);
  }

})();

App({
  onLaunch: function() {
    this.globalData.token = wx.getStorageSync('token')
    var userInfo = wx.getStorageSync('userInfo')
    this.globalData.companyId = userInfo.companyId
    this.globalData.userId = userInfo.id
    this.globalData.name = userInfo.name
    this.globalData.username = userInfo.username
  },
  globalData: {
    token: null,
    companyId: null,//公司Id
    userId: null,//用户id
    name: null,//用户昵称
    username:null,//用户名
    isCommit:false,//是否要提交数据
  },
  onPageNotFound(res) {
    wx.redirectTo({
      url: 'pages/404/404'
    })
  }
})