export function dateToDateStr(val) {
  if (val == null) {
    return null
  }
  const date = typeof val === 'object' ? val : new Date(val)
  return `${date.getFullYear()}-${date.getMonth() < 9 ? '0' : ''}${date.getMonth() + 1}-${date.getDate() < 10 ? '0' : ''}${date.getDate()}`
}
export function dateTimeToDateTimeStr(val) {
  if (val == null) {
    return null
  }
  const date = typeof val === 'object' ? val : new Date(val)
  return `${date.getFullYear()}-${date.getMonth() < 9 ? '0' : ''}${date.getMonth() + 1}-${date.getDate() < 10 ? '0' : ''}${date.getDate()} ` +
  `${date.getHours() < 10 ? '0' : ''}${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`
}
export function dateTimeToDateTimeToStr(val) {
  if (val == null) {
    return null
  }
  const date = typeof val === 'object' ? val : new Date(val)
  return `${date.getFullYear()}-${date.getMonth() < 9 ? '0' : ''}${date.getMonth() + 1}-${date.getDate() < 10 ? '0' : ''}${date.getDate()}`
}
export default {
  dateToDateStr,
  dateTimeToDateTimeStr
}
