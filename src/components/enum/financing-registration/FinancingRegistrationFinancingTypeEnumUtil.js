
function toTitle(val) {
  switch (val) {
    case 3:
      return '押汇'
    case 4:
      return '福费庭'
    case 1:
      return '信保融资'
    case 2:
      return '商票融资'
    case 5:
      return '贴现'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case '押汇':
      return 3
    case '福费庭':
      return 4
    case '信保融资':
      return 1
    case '商票融资':
      return 2
    case '贴现':
      return 5
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
