function toTitle(val) {
  switch (val) {
    case 1:
      return '挂机'
    case 2:
      return '柜机'
    case 3:
      return '移动空调'
    default:
      return val
  }
}
    
function toValue(val) {
  switch (val) {
    case '挂机':
      return 1
    case '柜机':
      return 2
    case '移动空调':
      return 3
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
  
