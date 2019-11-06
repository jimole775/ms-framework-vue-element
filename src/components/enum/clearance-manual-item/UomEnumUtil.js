
function toTitle(val) {
  switch (val) {
    case '1':
      return '台'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case '台':
      return '1'
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
