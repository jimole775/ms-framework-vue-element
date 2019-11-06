
function toTitle(val) {
  switch (val) {
    case 1:
      return '单冷'
    case 2:
      return '冷暖'
    default:
      return val
  }
}
  
function toValue(val) {
  switch (val) {
    case '单冷':
      return 1
    case '冷暖':
      return 2
    default:
      return val
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
  
