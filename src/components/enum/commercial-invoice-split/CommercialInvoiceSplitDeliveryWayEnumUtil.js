
function toTitle(val) {
  switch (val) {
    case 'BY_SEA':
      return 'BY SEA'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case 'BY SEA':
      return 'BY_SEA'
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
