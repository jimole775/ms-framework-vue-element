
function toTitle(val) {
  switch (val) {
    case 1:
      return '船务'
    case 2:
      return '单证'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case '船务':
      return 1
    case '单证':
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
