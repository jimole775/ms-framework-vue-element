
function toTitle(val) {
  switch (val) {
    case '1':
      return '奥克斯'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case '奥克斯':
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
