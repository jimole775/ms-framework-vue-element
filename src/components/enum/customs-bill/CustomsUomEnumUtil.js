function toTitle(val) {
  switch (val) {
    case 1:
      return 'UNIT'
    case 2:
      return 'KGS'
    case 3:
      return '个'
    case 4:
      return '套'
    default:
      return val
  }
}
    
function toValue(val) {
  switch (val) {
    case 'UNIT':
      return 1
    case 'KGS':
      return 2
    case '个':
      return 3
    case '套':
      return 4
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
  
