
function toTitle(val) {
  switch (val) {
    case 'EXCELLENT':
      return '优秀'
    case 'WELL':
      return '良好'
    case 'GENERAL':
      return '一般'
    case 'CREDIT_BANKRUPTCY':
      return '差'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case '优秀':
      return 'EXCELLENT'
    case '良好':
      return 'WELL'
    case '一般':
      return 'GENERAL'
    case '差':
      return 'CREDIT_BANKRUPTCY'
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
