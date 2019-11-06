
function toTitle(val) {
  switch (val) {
    case 1:
      return '国家'
    case 2:
      return '洲'
    case 3:
      return '区域'
    case 4:
      return '省/直属市'
    case 5:
      return '地区/地级市'
    case 6:
      return '区/县/县级市'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case '国家':
      return 1
    case '洲':
      return 2
    case '区域':
      return 3
    case '省/直属市':
      return 4
    case '地区/地级市':
      return 5
    case '区/县/县级市':
      return 6
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
