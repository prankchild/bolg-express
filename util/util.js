// UTC时间转化为本地时区时间（UTC时间格式一般为 "2017-11-16T05:23:20.000Z"）
// 转化时间 2017-11-16 PM 01:23
convertUTCTimeToLocalTime = function (UTCDateString) {
  if (!UTCDateString) {
    return '-'
  }
  function formatFunc (str) { // 格式化显示
    return str > 9 ? str : '0' + str
  }
  const date2 = new Date(UTCDateString) // 这步是关键
  const year = date2.getFullYear()
  const mon = formatFunc(date2.getMonth() + 1)
  const day = formatFunc(date2.getDate())
  let hour = date2.getHours()
  const noon = hour >= 12 ? 'PM' : 'AM'
  hour = hour >= 12 ? hour - 12 : hour
  hour = formatFunc(hour)
  const min = formatFunc(date2.getMinutes())
  const dateStr = year + '-' + mon + '-' + day + ' ' + noon + ' ' + hour + ':' + min
  return dateStr
}

module.exports = { convertUTCTimeToLocalTime }
