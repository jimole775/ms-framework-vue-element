
function toTitle(val) {
  switch (val) {
    case 1:
      return '不符点'
    case 2:
      return '交易金额差异'
    case 3:
      return '提单倒签'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case '不符点':
      return 1
    case '交易金额差异':
      return 2
    case '提单倒签':
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
