
function toTitle(val) {
  switch (val) {
    case '1':
      return '海运'
    case '2':
      return '空运'
    case '3':
      return '铁路'
    case '4':
      return '公路'
    case '5':
      return '海陆联运'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case '海运':
      return '1'
    case '空运':
      return '2'
    case '铁路':
      return '3'
    case '公路':
      return '4'
    case '海陆联运':
      return '5'
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
