
function toTitle(val) {
  switch (val) {
    case 1:
      return '待拖柜'
    case 2:
      return '已拖柜'
    case 3:
      return '取消'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case '待拖柜':
      return 1
    case '已拖柜':
      return 2
    case '取消':
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
