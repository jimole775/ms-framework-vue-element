function toTitle(val) {
  switch (val) {
    case 1:
      return 'AUX ELECTRIC (HONG KONG) COMPANY LIMITED'
    case 2:
      return 'AUX HOME APPLIANCES（HK）CO.,LIMITED'
    default:
      return val
  }
}
    
function toValue(val) {
  switch (val) {
    case 'AUX ELECTRIC (HONG KONG) COMPANY LIMITED':
      return 1
    case 'AUX HOME APPLIANCES（HK）CO.,LIMITED':
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
  
