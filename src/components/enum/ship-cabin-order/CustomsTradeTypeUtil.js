
function toTitle(val) {
  switch (val) {
    case 1:
      return '进出口贸易'
    case 2:
      return '香港转口贸易'
    case 3:
      return '香港直营'
    case 5:
      return '股份直营'
    case 6:
      return '新香港转口'
    case 7:
      return '新香港直营'    
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case '进出口贸易':
      return 1
    case '香港转口贸易':
      return 2
    case '香港直营':
      return 3
    case '股份直营':
      return 5
    case '新香港转口':
      return 6
    case '新香港直营':
      return 7  
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
