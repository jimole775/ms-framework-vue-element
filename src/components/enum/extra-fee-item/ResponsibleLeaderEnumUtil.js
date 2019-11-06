
function toTitle(val) {
  switch (val) {
    case 0:
      return ' '
    case 1:
      return '大区总监' 
    case 2:
      return '龚霞'
    case 3:
      return '郑科达'
    case 4:
      return '王庆'
    case 5:
      return '王常军'
    case 6:
      return '无'         
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case ' ':
      return '0'
    case '大区总监':
      return 1 
    case '龚霞':
      return 2
    case '郑科达':
      return 3
    case '王庆':
      return 4
    case '王常军':
      return 5
    case '无':
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
