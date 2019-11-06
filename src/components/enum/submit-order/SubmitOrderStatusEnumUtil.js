
function toTitle(val) {
  switch (val) {
    case 1:
      return '未交单'
    case 2:
      return '已交单'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case '未交单':
      return 1
    case '已交单':
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
