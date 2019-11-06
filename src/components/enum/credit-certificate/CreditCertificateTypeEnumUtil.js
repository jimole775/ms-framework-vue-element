
function toTitle(val) {
  switch (val) {
    case 1:
      return '普通'
    case 2:
      return '循环'
    case 3:
      return '备用'
    case 4:
      return '假远期'
    case 5:
      return '保函'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case '普通':
      return 1
    case '循环':
      return 2
    case '备用':
      return 3
    case '假远期':
      return 4
    case '保函':
      return 5
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
