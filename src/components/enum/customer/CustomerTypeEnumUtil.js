
function toTitle(val) {
  switch (val) {
    case 'DOMESTIC_SALE':
      return '内销'
    case 'DIRECT_SALE':
      return '直销'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case '内销':
      return 'DOMESTIC_SALE'
    case '直销':
      return 'DIRECT_SALE'
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
