
function toTitle(val) {
  switch (val) {
    case 101:
      return '家用'
    case 102:
      return '商用'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case '家用':
      return 101
    case '商用':
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
