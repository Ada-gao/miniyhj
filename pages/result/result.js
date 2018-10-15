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
    callsid: ''
  },
  onLoad: function (data) {
    this.setData({
      task:JSON.parse(data.task),
      callsid:data.callsid
    })
  },
  bindCountryChange: function (e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);
    this.setData({
      resultIndex: e.detail.value
    })
  },
  bindActionChange: function (e) {
    this.setData({
      actionIndex: e.detail.value
    })
  },
  openToast: function () {
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 2000
    });
  },
  hangUp: function () {
    this.setData({
      callStart: false
    })
  }
})