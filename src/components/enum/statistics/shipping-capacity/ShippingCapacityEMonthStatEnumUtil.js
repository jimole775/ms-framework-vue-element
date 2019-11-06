
function toTitle(val) {
  switch (val) {
    case 1:
      return '1月'
    case 2:
      return '2月'
    case 3:
      return '3月'
    case 4:
      return '4月'
    case 5:
      return '5月'
    case 6:
      return '6月'
    case 7:
      return '7月'
    case 8:
      return '8月'
    case 9:
      return '9月'
    case 10:
      return '10月'
    case 11:
      return '11月'
    case 12:
      return '12月'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case '1月':
      return 1
    case '2月':
      return 2
    case '3月':
      return 3
    case '4月':
      return 4
    case '5月':
      return 5
    case '6月':
      return 6
    case '7月':
      return 7
    case '8月':
      return 8
    case '9月':
      return 9
    case '10月':
      return 10
    case '11月':
      return 11
    case '12月':
      return 12
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
