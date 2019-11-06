
function toTitle(val) {
  switch (val) {
    case 1:
      return '押汇'
    case 2:
      return '福费廷'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case '押汇':
      return 1
    case '福费廷':
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
