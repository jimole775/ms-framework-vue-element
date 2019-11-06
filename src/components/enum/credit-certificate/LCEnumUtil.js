
function toTitle(val) {
  switch (val) {
    case 1:
      return '宁波'
    case 2:
      return '香港'
    case 5:
      return '股份直营'
    case 6:
      return '新香港'
    default:
      return ''
  }
}

function toValue(val) {
  switch (val) {
    case '宁波':
      return 1
    case '香港':
      return 2
    case '股份直营':
      return 5
    case '新香港':
      return 6
    default:
      return ''
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
