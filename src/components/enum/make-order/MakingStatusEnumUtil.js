
function toTitle(val) {
  switch (val) {
    case 0:
      return '制单'
    case 1:
      return '启动'
    case 2:
      return '已审核'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case '制单':
      return 0
    case '启动':
      return 1
    case '已审核':
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
