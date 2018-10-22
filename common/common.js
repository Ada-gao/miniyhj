const app = getApp()
//保存token信息
export function saveToken(token) {
  wx.setStorageSync('token', token)
  app.globalData.token = token
}
//保存用户信息
export function saveUserInfo(userinfo) {
  wx.setStorageSync('userInfo', userinfo)
  app.globalData.companyId = userinfo.companyId
  app.globalData.userId = userinfo.id
  app.globalData.name = userinfo.name
  app.globalData.username = userinfo.username
}
//分享
export function onShareAppMessage() {
  return {
    title: '闪电呼',
    path: '/pages/start/start'
  }
}
//显示toast
export function showToast(title, icon = 'none', duration = 2000) {
  wx.showToast({
    title: title + '',
    icon: icon,
    duration: duration,
  })
}
//打印log
export function log(msg, isDebug = true) {
  if (isDebug) {
    console.log(msg)
  }
}
//返回
export function back(delta = 1) {
  wx.navigateBack({
    delta: delta
  })
}