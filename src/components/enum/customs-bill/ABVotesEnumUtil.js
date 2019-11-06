function toTitle(val) {
  switch (val) {
    case 1:
      return 'A'
    case 2:
      return 'B'
    default:
      return val
  }
}
    
function toValue(val) {
  switch (val) {
    case 'A':
      return 1
    case 'B':
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
  
