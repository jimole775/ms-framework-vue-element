
function toTitle(val) {
  switch (val) {
    case 'STORE':
      return '卖场'
    case 'WHOLESALER':
      return '批发商'
    case 'RETAIL':
      return '零售渠道'
    case 'PROFESSIONAL':
      return '专业渠道'
    case 'INTERMEDIARY_TRADE':
      return '转口商'
    case 'BIG_CUSTOMER':
      return '全球大客户'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case '卖场':
      return 'STORE'
    case '批发商':
      return 'WHOLESALER'
    case '零售渠道':
      return 'RETAIL'
    case '专业渠道':
      return 'PROFESSIONAL'
    case '转口商':
      return 'INTERMEDIARY_TRADE'
    case '全球大客户':
      return 'BIG_CUSTOMER'
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
