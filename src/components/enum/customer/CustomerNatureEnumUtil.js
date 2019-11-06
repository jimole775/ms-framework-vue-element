
function toTitle(val) {
  switch (val) {
    case 'PROXY':
      return '品牌代理'
    case 'OEM':
      return 'OEM'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case '品牌代理':
      return 'PROXY'
    case 'OEM':
      return 'OEM'
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
