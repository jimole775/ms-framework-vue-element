
function toTitle(val) {
  switch (val) {
    case 1:
      return 'BY TRAIN'
    case 2:
      return 'BY SEA'
    case 3:
      return '自提'
    case 4:
      return 'BY AIR'
    case 5:
      return 'BYTRUCK'
    case 6:
      return 'BY EXPRESS'
    case 7:
      return 'BY LCL'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case 'BY TRAIN':
      return 1
    case 'BY SEA':
      return 2
    case '自提':
      return 3
    case 'BY AIR':
      return 4
    case 'BYTRUCK':
      return 5
    case 'BY EXPRESS':
      return 6
    case 'BY LCL':
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
