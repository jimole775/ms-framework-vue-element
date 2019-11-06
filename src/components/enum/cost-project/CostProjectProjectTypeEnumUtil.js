
function toTitle(val) {
  switch (val) {
    case 1:
      return '按柜'
    case 2:
      return '按票'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case '按柜':
      return 1
    case '按票':
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
