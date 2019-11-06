
function toTitle(val) {
  switch (val) {
    case 'USD':
      return 'USD'
    case 'CNY':
      return 'CNY'
    case 'EUR':
      return 'EUR'
    case 'HK$':
      return 'HK$'
    case 'GBP':
      return 'GBP'
    case 'THB':
      return 'THB'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case 'USD':
      return 'USD'
    case 'CNY':
      return 'CNY'
    case 'EUR':
      return 'EUR'
    case 'HK$':
      return 'HK$'
    case 'GBP':
      return 'GBP'
    case 'THB':
      return 'THB'
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
