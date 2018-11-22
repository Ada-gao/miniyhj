Component({
  properties: {
    totalElements: {
      type: Number,
      value: ''
    }
  },
  data: {
    tabType: 'follow',
  },
  methods: {
    openSearch: function(e) {
      wx.navigateTo({
        url: '/pages/customer/search',
      })
    },
    switchTab: function(e) {
      this.setData({
        tabType: e.currentTarget.dataset.type,
      })
      this.triggerEvent('switchTab', {
        tabType: this.data.tabType
      });
    },
  }
})