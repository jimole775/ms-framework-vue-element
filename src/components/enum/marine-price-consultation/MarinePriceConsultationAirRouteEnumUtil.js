
function toTitle(val) {
  switch (val) {
    case '1':
      return '无要求'
    case '2':
      return '中转'
    case '3':
      return '直达'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case '无要求':
      return '1'
    case '中转':
      return '2'
    case '直达':
      return '3'
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
