
function toTitle(val) {
  switch (val) {
    case 'LC':
      return 'LC'
    case 'DP':
      return 'DP'
    case 'DA':
      return 'DA'
    case 'OA':
      return 'OA'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case 'LC':
      return 'LC'
    case 'DP':
      return 'DP'
    case 'DA':
      return 'DA'
    case 'OA':
      return 'OA'
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
