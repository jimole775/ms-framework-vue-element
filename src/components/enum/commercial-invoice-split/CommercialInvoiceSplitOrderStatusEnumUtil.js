
function toTitle(val) {
  switch (val) {
    case 'MAKE':
      return '制单'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case '制单':
      return 'MAKE'
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
