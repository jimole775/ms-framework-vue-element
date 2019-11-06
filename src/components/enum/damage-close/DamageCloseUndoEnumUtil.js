
function toTitle(val) {
  switch (val) {
    case 1:
      return '撤案'
    case 2:
      return '结案'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case '撤案':
      return 1
    case '结案':
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
