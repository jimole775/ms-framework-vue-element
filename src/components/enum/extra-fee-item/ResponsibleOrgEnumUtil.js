
function toTitle(val) {
  switch (val) {
    case 0:
      return ' '
    case 1:
      return '物流'
    case 2:
      return '海外'
    case 3:
      return '制造'
    case 4:
      return '其它'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case ' ':
      return 0
    case '物流':
      return 1
    case '海外':
      return 2
    case '制造':
      return 3
    case '其它':
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
