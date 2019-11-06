
function toTitle(val) {
  switch (val) {
    case '等待':
      return '等待'
    case '已完成':
      return '已完成'
    case '装柜中':
      return '装柜中'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case '等待':
      return '等待'
    case '已完成':
      return '已完成'
    case '装柜中':
      return '装柜中'
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
