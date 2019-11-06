
function toTitle(val) {
  switch (val) {
    case '银行汇款':
      return '银行汇款'
    case '银行承兑':
      return '银行承兑'
    case '转货款':
      return '转货款'
    case '置换支付':
      return '置换支付'
    case '转账支票':
      return '转账支票'
    case '现金':
      return '现金'
    case '其它':
      return '其它'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case '银行汇款':
      return '银行汇款'
    case '银行承兑':
      return '银行承兑'
    case '转货款':
      return '转货款'
    case '置换支付':
      return '置换支付'
    case '转账支票':
      return '转账支票'
    case '现金':
      return '现金'
    case '其它':
      return '其它'
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
