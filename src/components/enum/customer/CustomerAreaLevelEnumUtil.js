
function toTitle(val) {
  switch (val) {
    case 'S':
      return 'S'
    case 'A':
      return 'A'
    case 'B':
      return 'B'
    case 'C':
      return 'C'
    case 'D':
      return 'D'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case 'S':
      return 'S'
    case 'A':
      return 'A'
    case 'B':
      return 'B'
    case 'C':
      return 'C'
    case 'D':
      return 'D'
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
