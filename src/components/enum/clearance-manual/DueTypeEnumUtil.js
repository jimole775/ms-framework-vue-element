
function toTitle(val) {
  switch (val) {
    case '1':
      return 'test'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case 'test':
      return '1'
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
