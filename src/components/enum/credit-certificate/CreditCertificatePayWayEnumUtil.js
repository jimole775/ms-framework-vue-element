
function toTitle(val) {
  switch (val) {
    case 1:
      return 'PAYMENT'
    case 2:
      return 'NEGOTIATION'
    case 3:
      return 'DEF PAYMENT'
    case 4:
      return 'ACCEPTANCE'
    case 5:
      return 'MIXED PAYMENT'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case 'PAYMENT':
      return 1
    case 'NEGOTIATION':
      return 2
    case 'DEF PAYMENT':
      return 3
    case 'ACCEPTANCE':
      return 4
    case 'MIXED PAYMENT':
      return 5
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
