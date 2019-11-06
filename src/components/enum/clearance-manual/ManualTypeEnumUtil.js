
function toTitle(val) {
  switch (val) {
    case '1':
      return '进料加工'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case '进料加工':
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
