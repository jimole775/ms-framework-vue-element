
function toTitle(val) {
  switch (Number.parseInt(val)) {
    case 0:
      return '未选择'
    case 1:
      return '更新托书'
    case 2:
      return '更新船期'
    case 3:
      return '重新订舱'
    case 4:
      return '其他变更'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case '未选择':
      return 0
    case '更新托书':
      return 1
    case '更新船期':
      return 2
    case '重新订舱':
      return 3
    case '其他变更':
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
