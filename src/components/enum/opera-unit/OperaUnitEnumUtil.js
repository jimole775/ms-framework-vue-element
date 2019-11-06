
function toTitle(val) {
  switch (val) {
    case 101:
      return '家用组织'
    case 102:
      return '商用组织'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case '家用组织':
      return 101
    case '商用组织':
      return 102
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
