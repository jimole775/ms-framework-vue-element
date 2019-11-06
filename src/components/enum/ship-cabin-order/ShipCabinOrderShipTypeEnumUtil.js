
function toTitle(val) {
  switch (val) {
    case 1:
      return 'BY TRAIN'
    case 2:
      return 'BY SEA'
    case 3:
      return '出差专用 '
    case 4:
      return 'BY AIR5'
    case 5:
      return 'BY TRUCK'
    case 6:
      return 'BY EXPRESS(快递)'  
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
    case '出差专用 ':
      return 3
    case 'BY AIR5':
      return 4
    case 'BY TRUCK':
      return 5
    case 'BY EXPRESS(快递)':
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
