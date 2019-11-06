
function toTitle(val) {
  switch (val) {
    case 1:
      return '正贸'
    case 2:
      return '边贸'
    case 3:
      return '越南内销'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case '正贸':
      return 1
    case '边贸':
      return 2
    case '越南内销':
      return 3
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
