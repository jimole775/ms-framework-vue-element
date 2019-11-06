
function toTitle(val) {
  switch (val) {
    case 1:
      return '内部变更'
    case 2:
      return '外部变更'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case '内部变更':
      return 1
    case '外部变更':
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
