var req = require('../../utils/request.js')
var common = require('../../common/common.js')
Page({
  data: {
    imgs: []
  },
  upload: function() {
    req.post('app/upload', {}, function(res) {
      common.log(res.data)
    })
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
    let that = this
    let content = e.detail.value.content
    if (content) {
      let uuids = that.data.imgs.join(',')
      req.post('app/feedback?uuids=' + uuids + '&content=' + content, {
        uuids: uuids,
        content: content
      }, function(res) {
        wx.showModal({
          content: "提交成功",
          showCancel: false,
          success: function(res) {
            wx.navigateBack({
              delta: 1
            })
          }
        })
      })
    } else {
      common.showToast('请输入您要反馈的问题')
    }
  },
  onShareAppMessage: function() {
    return common.onShareAppMessage()
  },
  back: function() {
    common.back()
  }
})