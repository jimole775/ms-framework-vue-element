function toTitle(val) {
  switch (val) {
    case 1:
      return '整机'
    case 2:
      return '内机'
    case 3:
      return '外机'
    case 4:
      return '配件'
    case 5:
      return '样机'
    case 6:
      return 'SKD'
    case 7:
      return 'CKD'
    case 8:
      return '支架或木托'
    case 9:
      return '促销品'
    default:
      return val
  }
}
    
function toValue(val) {
  switch (val) {
    case '整机':
      return 1
    case '内机':
      return 2
    case '外机':
      return 3
    case '配件':
      return 4
    case '样机':
      return 5
    case 'SKD':
      return 6
    case 'CKD':
      return 7
    case '支架或木托':
      return 8
    case '促销品':
      return 9
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
  
