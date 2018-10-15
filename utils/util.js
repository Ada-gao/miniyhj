const formatTime = (date, dateType) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  let timeStr = ''
  if (dateType === 'date') {
    timeStr = [year, month, day].map(formatNumber).join('/')
  } else {
    timeStr = [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  }

  return timeStr
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const transformText = (source, k) => {
  if (!source && typeof source !== 'object') {
    return '无'
    throw new Error('error arguments', 'shallowClone')
  }
  let obj = {}
  source.forEach((val) => {
    let key = val.value
    obj[key] = val.label
  })
  k = obj[k]
  return k
}

module.exports = {
  formatTime: formatTime,
  transformText: transformText
}
