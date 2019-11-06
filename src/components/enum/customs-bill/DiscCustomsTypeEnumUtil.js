function toTitle(val) {
  switch (val) {
    case 1:
      return '出口货物在最终目的国（地区）不享受优惠关税'
    case 2:
      return '出口货物在最终目的国（地区）享受优惠关税'
    case 3:
      return '出口货物不能确定在最终目的国（地区）享受优惠关税'
    default:
      return val
  }
}
    
function toValue(val) {
  switch (val) {
    case '出口货物在最终目的国（地区）不享受优惠关税':
      return 1
    case '出口货物在最终目的国（地区）享受优惠关税':
      return 2
    case '出口货物不能确定在最终目的国（地区）享受优惠关税':
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
  
