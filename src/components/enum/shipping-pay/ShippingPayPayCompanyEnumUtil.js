
function toTitle(val) {
  switch (val) {
    case 'STOCK':
      return '股份公司'
    case 'EXPORT':
      return '进出口公司'
    case 'NEW_HK':
      return '新香港公司'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case '股份公司':
      return 'STOCK'
    case '进出口公司':
      return 'EXPORT'
    case '新香港公司':
      return 'NEW_HK'
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
