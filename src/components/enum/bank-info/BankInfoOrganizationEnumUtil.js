
function toTitle(val) {
  switch (val) {
    case 'NINGBO':
      return '宁波'
    case 'HK':
      return '香港'
    case 'STOCK':
      return '股份直营'
    case 'NEW_HK':
      return '新香港'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case '宁波':
      return 'NINGBO'
    case '香港':
      return 'HK'
    case '股份直营':
      return 'STOCK'
    case '新香港':
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
