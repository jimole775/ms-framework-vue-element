
function toTitle(val) {
  switch (val) {
    case '1':
      return '人民币'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case '人民币':
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
