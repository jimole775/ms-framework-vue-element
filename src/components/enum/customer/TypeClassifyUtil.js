function toTitle(val) {
  switch (val) {
    case 1:
      return '内机'
    case 2:
      return '外机'
    case 3:
      return '套机'
    case 4:
      return '移动空调'
    default:
      return val
  }
}
    
function toValue(val) {
  switch (val) {
    case '内机':
      return 1
    case '外机':
      return 2
    case '套机':
      return 3
    case '移动空调':
      return 4
  }
}
    
function toTitleFilter(val) {
  return toTitle(val)
}
    
function toValueFilter(val) {
  return toValue(val)
}
    
export default {
  toTitle,
  toValue,
  toTitleFilter,
  toValueFilter
}
