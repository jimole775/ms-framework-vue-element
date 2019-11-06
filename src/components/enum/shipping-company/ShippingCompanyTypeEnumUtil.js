
function toTitle(val) {
  switch (val) {
    case 2:
      return '船公司'
    case 1:
      return '货代公司'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case '船公司':
      return 2
    case '货代公司':
      return 1
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
