var req = require('../../utils/request.js')
var common = require('../../common/common.js')
let env = require('../../config/env.js')
const baseURL = env.BASE_API
const app = getApp()
Page({
  data: {
    imgs: [],
    files: [],
    content: ''
  },
  upload: function() {
    let that = this
    let file = that.data.imgs[that.data.files.length]
    req.upload('app/upload', file, function(res) {
      that.data.files[that.data.files.length] = res.data
      that.setData({
        files: that.data.files
      })
      if (that.data.files.length != that.data.imgs.length) {
        that.upload()
      } else {
        that.feedback()
      }
    }, false)
  },
  addPic: function(e) {
    let that = this
    let length = that.data.imgs.length
    if (length === 3) {
      common.showToast('最多上传3张图片!')
      return false;
    }
    wx.chooseImage({
      count: 3 - length,
      success: function(res) {
        let i = 0;
        for (var index in res.tempFilePaths) {
          that.data.imgs[length + i] = res.tempFilePaths[index];
          i++;
        }
        that.setData({
          imgs: that.data.imgs
        })
      }
    });
  },
  delPic: function(e) {
    let imgs = [];
    for (var index in this.data.imgs) {
      if (index == e.currentTarget.dataset.index) {
        continue;
      }
      imgs[imgs.length] = this.data.imgs[index];
    }
    this.setData({
      imgs: imgs
    })
  },
  formSubmit: function(e) {
    let content = e.detail.value.content
    if (content) {
      wx.showLoading()
      this.setData({
        files: [],
        content: content
      })
      if (this.data.imgs.length > 0) {
        this.upload()
      } else {
        this.feedback()
      }
    } else {
      common.showToast('请输入您要反馈的问题')
    }
  },
  feedback: function() {
    let that = this
    let content = that.data.content
    let uuids = that.data.files.join(',')
    req.post('app/feedback?uuids=' + uuids + '&content=' + content, {
      uuids: uuids,
      content: content
    }, function(res) {
      wx.hideLoading()
      wx.showModal({
        content: "提交成功",
        showCancel: false,
        success: function(res) {
          wx.navigateBack({
            delta: 1
          })
        }
      })
    }, false)

  },
  onShareAppMessage: function() {
    return common.onShareAppMessage()
  },
  back: function() {
    common.back()
  }
})