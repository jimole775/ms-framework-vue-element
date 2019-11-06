
function toTitle(val) {
  switch (val) {
    case 1:
      return '否'
    case 2:
      return '是'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case '否':
      return 1
    case '是':
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
