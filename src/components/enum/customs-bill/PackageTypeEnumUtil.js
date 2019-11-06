function toTitle(val) {
  switch (val) {
    case 1:
      return 'PACKAGES'
    case 2:
      return 'CARTONS'
    default:
      return val
  }
}
    
function toValue(val) {
  switch (val) {
    case 'PACKAGES':
      return 1
    case 'CARTONS':
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
  
