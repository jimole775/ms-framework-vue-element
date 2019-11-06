
function toTitle(val) {
  switch (val) {
    case '1':
      return 'TT'
    case '2':
      return 'LC'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case 'TT':
      return '1'
    case 'LC':
      return '2'
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
