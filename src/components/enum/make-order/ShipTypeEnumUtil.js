
function toTitle(val) {
  switch (val) {
    case 1:
      return '正本'
    case 2:
      return '电放'
    case 3:
      return 'SEAWAY BILL'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case '正本':
      return 1
    case '电放':
      return 2
    case 'SEAWAY BILL':
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
