
function toTitle(val) {
  switch (val) {
    case '0':
      return '拖欠'
    case '1':
      return '拒收'
    case '2':
      return '破产'
    case '3':
      return '其它'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case '拖欠':
      return '0'
    case '拒收':
      return '1'
    case '破产':
      return '2'
    case '其它':
      return '3'
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
