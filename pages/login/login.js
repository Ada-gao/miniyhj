Page({
  data: {
    isShowPassword: true
  },
  onLoad: function () {
   
  },
  formSubmit: function (e) {
    let account = e.detail.value.account;
    let password = e.detail.value.password;
    if (account.length === 0){
      wx.showToast({
        title: '用户名不能为空',
        icon: 'none',
        duration: 1500,
      })
    } else if (password.length === 0) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        duration: 1500,
      })
    }else {
      if (account === 'admin' && e.detail.value.password === '123') {
        wx.showLoading()
        setTimeout(function () {
          wx.hideLoading()
          wx.switchTab({
            url: '/pages/index/index',
          })
        }, 3000)
      } else {
        wx.showToast({
          title: '用户名或密码错误',
          icon: 'none',
          duration: 1500,
        })
      }
    }
  },
  switchPwd:function(e){
    if (this.data.isShowPassword){
      this.setData({
        isShowPassword: false
      })
    }else {
      this.setData({
        isShowPassword: true
      })
    }
  }
})
