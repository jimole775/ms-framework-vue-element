
function toTitle(val) {
  switch (val) {
    case 1:
      return '电放'
    case 2:
      return '寄单'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case '电放':
      return 1
    case '寄单':
      return 2
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
