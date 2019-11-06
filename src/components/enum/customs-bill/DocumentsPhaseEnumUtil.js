function toTitle(val) {
  switch (val) {
    case 1:
      return '报关'
    case 2:
      return '发票制作/财务资料上传'
    case 3:
      return '出运申报/清关单确认'
    case 4:
      return '提单交单'
    case 5:
      return '交单登记' 
    case 6:
      return '商业发票制作'  
    default:
      return val
  }
}
    
function toValue(val) {
  switch (val) {
    case '报关':
      return 1
    case '发票制作/财务资料上传':
      return 2
    case '出运申报/清关单确认':
      return 3
    case '提单交单':
      return 4
    case '交单登记':
      return 5
    case '商业发票制作':
      return 6  
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
  
