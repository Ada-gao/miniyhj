var req = require('../../utils/request.js')
var common = require('../../common/common.js')
var interval
Page({
  data: {
    citys: null,
    types: null,
    scales: null,
    address: null,
    industryType: null,
    orgSize: null,
    phoneNum: null,
    isSend: false,
    time: 0,
  },
  onLoad: function(options) {
    let that = this
    req.get('industry/auth/getAllTypes', function(res) {
      that.setData({
        types: res.data
      })
      req.get('dict/TypeorgSize', function(res) {
        that.setData({
          scales: res.data
        })
      })
    })
  },
  cityChange: function(e) {
    let address = e.detail.value
    this.setData({
      address: address
    })
  },
  typeChange: function(e) {
    let industryType = this.data.types[e.detail.value].name
    this.setData({
      industryType: industryType
    })
  },
  scaleChange: function(e) {
    let orgSize = this.data.scales[e.detail.value].label
    this.setData({
      orgSize: orgSize
    })
  },
  formSubmit: function(e) {
    let companyName = e.detail.value.companyName
    let address = this.data.address
    let industryType = this.data.industryType
    let orgSize = this.data.orgSize
    let contact = e.detail.value.contact
    let phoneNum = this.data.phoneNum
    let verifyCode = e.detail.value.verifyCode
    if (!companyName) {
      common.showToast('请输入公司名称')
      return
    } else if (!address) {
      common.showToast('请选择公司所在地')
      return
    } else if (!industryType) {
      common.showToast('请选择所属行业')
      return
    } else if (!orgSize) {
      common.showToast('请选择公司规模')
      return
    } else if (!contact) {
      common.showToast('请输入联系人姓名')
      return
    } else if (!verifyCode) {
      common.showToast('请输入验证码')
      return
    } else if (verifyCode.length != 4) {
      common.showToast('验证码输入有误')
      return
    }
    let that = this
    if (that.checkPhone()) {
      req.post('sms/verify?phoneNum=' + phoneNum + '&verifyCode=' + verifyCode, {
        phoneNum: phoneNum,
        verifyCode: verifyCode,
      }, function(res) {
        if (res.data === '失败') {
          common.showToast('验证码不正确')
        } else {
          req.post('trial', {
            companyName: companyName,
            companyProvince: address[0],
            companyCity: address[1],
            industry: '',
            industryType: industryType,
            orgSize: orgSize,
            contact: contact,
            mobile: phoneNum,
            status: 0,
            productType: "闪电呼",
            source: "微信小程序",
          }, function(res) {
            wx.showModal({
              content: "提交成功",
              showCancel: false,
              success: function(res) {
                wx.reLaunch({
                  url: '/pages/login/login',
                })
              }
            })
          })
        }
      })
    }
  },
  phoneInput: function(e) {
    this.setData({
      phoneNum: e.detail.value
    })
  },
  getCode: function(e) {
    let that = this
    if (that.data.isSend) {
      return
    }
    if (that.checkPhone()) {
      req.post('sms/send?phoneNum=' + that.data.phoneNum, {
        phoneNum: that.data.phoneNum,
      }, function(res) {
        common.showToast('发送成功')
        that.setData({
          isSend: true,
          time: 60
        })
        let time = that.data.time
        interval = setInterval(function() {
          time--
          that.setData({
            time: time
          })
          if (time === 0) {
            that.setData({
              isSend: false,
            })
            clearInterval(interval)
          }
        }, 1000)
      })
    }
  },
  checkPhone: function() {
    let phoneNum = this.data.phoneNum
    if (phoneNum) {
      if (phoneNum.length != 11) {
        common.showToast('手机号输入有误')
        return false
      } else {
        return true
      }
    } else {
      common.showToast('请输入联系人电话')
      return false
    }
  },
  onUnload: function() {
    if (interval) {
      clearInterval(interval)
    }
  },
  onShareAppMessage: function() {
    return common.onShareAppMessage()
  },
  back: function() {
    common.back()
  }
})