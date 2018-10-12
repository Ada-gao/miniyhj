function show(title,icon='none',duration=2000) {
  wx.showToast({
    title: title,
    icon: icon,
    duration: duration,
  }) 
}
module.exports = {
  show: show
}