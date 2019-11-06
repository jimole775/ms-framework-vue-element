
function toTitle(val) {
  switch (val) {
    case 1:
      return '按协议货代'
    case 2:
      return '按部门'
    case 3:
      return '按船司'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case '按协议货代':
      return 1
    case '按部门':
      return 2
    case '按船司':
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
