
function toTitle(val) {
  switch (val) {
    case '1':
      return 'FREIGHT PREPAID'
    case '2':
      return 'FREIGHT COLLECT'
    case '3':
      return 'THIRD-PARTY PAYMENT'
    case '4':
      return 'APPOINTED FREIGHT PREPAID'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case 'FREIGHT PREPAID':
      return '1'
    case 'FREIGHT COLLECT':
      return '2'
    case 'THIRD-PARTY PAYMENT':
      return '3'
    case 'APPOINTED FREIGHT PREPAID':
      return '4'
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
